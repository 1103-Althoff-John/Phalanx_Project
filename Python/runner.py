# runner.py
"""
Run the evaluation pipeline.

The provider and model can be specified three ways (highest priority first):

  1. CLI flags:
       python3 runner.py --provider openai --model gpt-4o

  2. Auto-detection from environment variables (no flags needed):
       OPENAI_API_KEY=sk-...      python3 runner.py  -> uses openai + gpt-4o
       ANTHROPIC_API_KEY=sk-...   python3 runner.py  -> uses anthropic + claude-3-5-haiku
       MISTRAL_API_KEY=...        python3 runner.py  -> uses mistral + mistral-large-latest
       COHERE_API_KEY=...         python3 runner.py  -> uses cohere + command-r-plus
       GROQ_API_KEY=...           python3 runner.py  -> uses groq + llama-3.1-8b-instant

  3. config.yaml values (fallback if nothing else is set)

Supported providers: groq, openai, anthropic, mistral, cohere
"""

import argparse
import os
from dotenv import load_dotenv

from pipeline import EvaluationPipeline, EvaluationConfig
from llm_client import detect_provider, get_default_model

load_dotenv()


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="LLM Jailbreak Evaluation Runner")
    parser.add_argument(
        "--provider",
        type=str,
        help="LLM provider to use: groq, openai, anthropic, mistral, cohere",
    )
    parser.add_argument(
        "--model",
        type=str,
        help="Model name to use (e.g. gpt-4o, claude-3-5-haiku-20241022)",
    )
    parser.add_argument(
        "--config",
        type=str,
        default="config.yaml",
        help="Path to config YAML file (default: config.yaml)",
    )
    return parser


if __name__ == "__main__":
    parser = build_parser()
    args = parser.parse_args()

    # Load base config from YAML
    cfg = EvaluationConfig.from_yaml(args.config)

    # Determine provider: CLI flag > auto-detect > config.yaml
    if args.provider:
        provider = args.provider.lower()
        # Find the matching API key env var
        env_map = {
            "groq":      "GROQ_API_KEY",
            "openai":    "OPENAI_API_KEY",
            "anthropic": "ANTHROPIC_API_KEY",
            "mistral":   "MISTRAL_API_KEY",
            "cohere":    "COHERE_API_KEY",
        }
        api_key = os.getenv(env_map.get(provider, ""), None)
    else:
        provider, api_key = detect_provider()
        if provider != cfg.target_provider:
            print(f"[runner] Auto-detected provider: {provider}")

    # Determine model: CLI flag > default for detected provider > config.yaml
    if args.model:
        model = args.model
    elif args.provider or provider != cfg.target_provider:
        # Provider was overridden, use its default model
        model = get_default_model(provider)
    else:
        # No override, keep config.yaml model
        model = cfg.target_model

    # Apply overrides to config
    cfg.target_provider = provider
    cfg.judge_provider = provider
    cfg.target_model = model
    cfg.judge_model = model

    print(f"[runner] Provider : {provider}")
    print(f"[runner] Model    : {model}")

    pipeline = EvaluationPipeline(config=cfg, api_key=api_key)
    pipeline.run_and_save()