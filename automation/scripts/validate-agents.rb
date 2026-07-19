#!/usr/bin/env ruby
# frozen_string_literal: true
#
# Validate every agents/specs/*.agent.yaml against agents/agent.schema.yaml.
# Turns CI invariant #2 ("validate specs against the agent schema") from intent into a
# build-breaking check. Exits non-zero on the first spec that fails.
#
# ponytail: schema-driven-lite, not a full JSON-Schema engine. It reads the schema's
# `required`, `properties`, enums, and pattern so it self-maintains as the schema grows,
# and hard-codes only the two nested checks that matter (token_budget, context). If specs
# ever need deep conditional/`$ref` validation, swap this for a real validator (e.g. the
# `json_schemer` gem) — until then this catches the failure modes that actually occur:
# missing required field, unknown field, bad enum, malformed id, incomplete token_budget.

require "yaml"

ROOT   = File.expand_path("../..", __dir__)
SCHEMA = File.join(ROOT, "agents", "agent.schema.yaml")
SPECS  = Dir[File.join(ROOT, "agents", "specs", "*.agent.yaml")].sort

schema = YAML.load_file(SCHEMA)
props  = schema.fetch("properties")
errors = []

def enum_of(props, *path)
  path.reduce(props) { |node, k| node.is_a?(Hash) ? node[k] : nil }
end

# Enum locations declared in the schema (kept explicit so a moved enum fails loudly here
# rather than silently skipping validation).
STATUS_ENUM    = ->(p) { enum_of(p, "status", "enum") }
TIER_ENUM      = ->(p) { enum_of(p, "model_tier", "enum") }
RETRIEVAL_ENUM = ->(p) { p.dig("context", "properties", "retrieval", "enum") }

abort "no agent specs found under agents/specs/" if SPECS.empty?

SPECS.each do |path|
  rel  = path.sub("#{ROOT}/", "")
  spec = YAML.load_file(path)
  errs = []

  unless spec.is_a?(Hash)
    errors << "#{rel}: not a YAML mapping"
    next
  end

  # required top-level keys (from the schema itself)
  schema.fetch("required").each do |k|
    errs << "missing required key `#{k}`" unless spec.key?(k)
  end

  # additionalProperties: false → no unknown top-level keys
  if schema["additionalProperties"] == false
    (spec.keys - props.keys).each { |k| errs << "unknown key `#{k}` (schema forbids extras)" }
  end

  # id pattern
  if (pat = props.dig("id", "pattern")) && spec["id"] && !Regexp.new(pat).match?(spec["id"])
    errs << "id `#{spec["id"]}` does not match /#{pat}/"
  end

  # kind const
  if (kconst = props.dig("kind", "const")) && spec["kind"] != kconst
    errs << "kind must be `#{kconst}`, got `#{spec["kind"].inspect}`"
  end

  # enums
  if (e = STATUS_ENUM.call(props)) && spec["status"] && !e.include?(spec["status"])
    errs << "status `#{spec["status"]}` not in #{e.inspect}"
  end
  if (e = TIER_ENUM.call(props)) && spec["model_tier"] && !e.include?(spec["model_tier"])
    errs << "model_tier `#{spec["model_tier"]}` not in #{e.inspect}"
  end
  if (e = RETRIEVAL_ENUM.call(props)) && (r = spec.dig("context", "retrieval")) && !e.include?(r)
    errs << "context.retrieval `#{r}` not in #{e.inspect}"
  end

  # token_budget nested required (context_max, output_max)
  tb_required = props.dig("token_budget", "required") || []
  tb = spec["token_budget"]
  if tb.is_a?(Hash)
    tb_required.each { |k| errs << "token_budget missing `#{k}`" unless tb.key?(k) }
  elsif spec.key?("token_budget")
    errs << "token_budget must be a mapping"
  end

  if errs.empty?
    puts "OK   #{rel}"
  else
    errs.each { |e| errors << "#{rel}: #{e}" }
    puts "FAIL #{rel}"
  end
end

unless errors.empty?
  warn "\n#{errors.length} validation error(s):"
  errors.each { |e| warn "  - #{e}" }
  exit 1
end

puts "\n#{SPECS.length} agent spec(s) valid."
