import React from 'react';
import {
  Cpu,
  Scale,
  Brain,
  ShieldCheck,
  HelpCircle,
  ArrowRight,
  Gauge,
} from 'lucide-react';

interface ModelCapacity {
  name: string;
  provider: string;
  maxTokens: number;
  costPerMillionInput: number; // USD
  costPerMillionOutput: number; // USD
  flavor: string;
}

export function LLMTokenTelemetry() {
  const selectedPromptSize = 35000; // Fixed: 35,000 tokens
  const simulatedOutputType = 4500; // Fixed: 4,500 tokens

  const modelsList: ModelCapacity[] = [
    {
      name: 'Gemini 1.5 Pro',
      provider: 'Google',
      maxTokens: 2000000,
      costPerMillionInput: 1.25,
      costPerMillionOutput: 5.0,
      flavor:
        'Industry-leading extreme-scale context. Perfect for scanning full code repositories.',
    },
    {
      name: 'Gemini 2.5 Pro',
      provider: 'Google',
      maxTokens: 2000000,
      costPerMillionInput: 1.25,
      costPerMillionOutput: 5.0,
      flavor:
        'Advanced reasoning and coding intelligence with massive, multimodality-native context layers.',
    },
    {
      name: 'Gemini 1.5 Flash',
      provider: 'Google',
      maxTokens: 1000000,
      costPerMillionInput: 0.075,
      costPerMillionOutput: 0.3,
      flavor:
        'High-speed high-throughput massive context at extremely low operating costs.',
    },
    {
      name: 'Gemini 2.5 Flash',
      provider: 'Google',
      maxTokens: 1000000,
      costPerMillionInput: 0.075,
      costPerMillionOutput: 0.3,
      flavor:
        'Optimized low-latency fast execution designed for real-time integrations and agents.',
    },
    {
      name: 'Claude 3.5 Sonnet',
      provider: 'Anthropic',
      maxTokens: 200000,
      costPerMillionInput: 3.0,
      costPerMillionOutput: 15.0,
      flavor:
        'Superb logical reasoning and analytical abilities with standard corporate context buffers.',
    },
    {
      name: 'GPT-4o',
      provider: 'OpenAI',
      maxTokens: 128000,
      costPerMillionInput: 2.5,
      costPerMillionOutput: 10.0,
      flavor:
        'Multi-purpose flagship model with general knowledge base and standard developer API buffers.',
    },
    {
      name: 'GPT-3.5 Turbo',
      provider: 'OpenAI',
      maxTokens: 16385,
      costPerMillionInput: 0.5,
      costPerMillionOutput: 1.5,
      flavor:
        'Legacy lightweight model for fast, simplistic standard text processing pipelines.',
    },
  ];

  // Helper conversions: 1 token approx 0.75 words. 500 words per page.
  const getSubMetrics = (tokens: number) => {
    const words = Math.round(tokens * 0.75);
    const pages = (tokens * 0.75) / 500;
    return `${words.toLocaleString()} words (${pages.toFixed(1)} pages)`;
  };

  const totalTokens = selectedPromptSize + simulatedOutputType;

  return (
    <div
      id="llm-telemetry-panel"
      className="border border-black p-6 rounded bg-stone-50/10 flex flex-col gap-8 w-full font-mono select-all mt-8"
    >
      {/* Dynamic Panel Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-black pb-4 gap-2">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-neutral-800" />
          <h3 className="font-serif text-lg font-black uppercase tracking-wide select-all">
            LLM Context Telemetry & Code Limits
          </h3>
        </div>
        <div className="text-[10px] text-stone-500 font-bold bg-stone-100 px-3 py-1 border border-stone-200 rounded uppercase select-none flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>{' '}
          Multi-metric Telemetry Enabled
        </div>
      </div>

      <p className="font-sans text-xs text-neutral-700 leading-relaxed max-w-4xl">
        This telemetry module monitors real-time code parsing state structures.
        As development complexity scales, maintaining critical context is
        paramount. Below is a detailed mapping of context limits comparing the
        prominent Gemini-range models against legacy industry standards.
      </p>

      {/* Grid container: Left is Interactive Simulator, Right is Reference Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: INTERACTIVE Prompt Simulator */}
        <div className="lg:col-span-5 border border-stone-300 p-5 rounded bg-white flex flex-col gap-4">
          <div className="font-serif font-black text-xs text-neutral-800 border-b border-stone-100 pb-2 flex items-center gap-1.5 uppercase">
            <Gauge className="w-4 h-4 text-black" /> Context Bounds Simulator
          </div>

          {/* Quick Metrics display - showing tokens, words, pages simultaneously */}
          <div className="bg-stone-50 p-4 border border-stone-200/80 rounded flex flex-col gap-2.5">
            <div className="grid grid-cols-12 text-[10px] font-bold text-neutral-400 uppercase tracking-wider pb-1 border-b border-stone-200">
              <span className="col-span-4">Payload Category</span>
              <span className="col-span-3 text-center">Tokens</span>
              <span className="col-span-5 text-right">
                Words & Pages Equivalent
              </span>
            </div>

            {/* Input Space row */}
            <div className="grid grid-cols-12 items-center text-xs text-neutral-600 font-mono">
              <span className="col-span-4 font-semibold text-neutral-500">
                Input Space:
              </span>
              <span className="col-span-3 text-center font-bold text-stone-950">
                {selectedPromptSize.toLocaleString()}
              </span>
              <span className="col-span-5 text-right text-[11px] text-stone-700">
                {getSubMetrics(selectedPromptSize)}
              </span>
            </div>

            {/* Generation Size row */}
            <div className="grid grid-cols-12 items-center text-xs text-neutral-600 font-mono">
              <span className="col-span-4 font-semibold text-neutral-500">
                Generation:
              </span>
              <span className="col-span-3 text-center font-bold text-stone-950">
                {simulatedOutputType.toLocaleString()}
              </span>
              <span className="col-span-5 text-right text-[11px] text-stone-700">
                {getSubMetrics(simulatedOutputType)}
              </span>
            </div>

            <div className="border-t border-stone-200 border-dashed my-1"></div>

            {/* Total active payload */}
            <div className="grid grid-cols-12 items-center text-xs font-bold text-neutral-900 bg-yellow-50 p-2 border border-yellow-200 rounded">
              <span className="col-span-4 uppercase text-stone-800">
                TOTAL SIZE:
              </span>
              <span className="col-span-3 text-center text-black bg-yellow-100 border border-yellow-300 px-1.5 py-0.5 rounded text-[11px] font-extrabold font-mono">
                {totalTokens.toLocaleString()}
              </span>
              <span className="col-span-5 text-right text-[11px] text-stone-900 font-extrabold">
                {getSubMetrics(totalTokens)}
              </span>
            </div>
          </div>

          {/* Fixed Input Size Details */}
          <div className="flex flex-col gap-1.5 mt-2 bg-stone-50 p-3 rounded border border-stone-200">
            <div className="flex justify-between text-[11px] font-bold text-stone-700">
              <span>Input Size (Code & Instructions):</span>
              <span className="font-mono text-black">
                {selectedPromptSize.toLocaleString()} tokens
              </span>
            </div>
            <div className="text-[10px] text-stone-500 font-sans leading-relaxed">
              Locked to a fixed standard size representing a comprehensive game
              rule sheet, world state schema, and live session variables.
            </div>
          </div>

          {/* Fixed Output Generation Size */}
          <div className="flex flex-col gap-1.5 mt-2 bg-stone-50 p-3 rounded border border-stone-200">
            <div className="flex justify-between text-[11px] font-bold text-stone-700">
              <span>Target Output Length (Response size):</span>
              <span className="font-mono text-black">
                {simulatedOutputType.toLocaleString()} tokens
              </span>
            </div>
            <div className="text-[10px] text-stone-500 font-sans leading-relaxed">
              Locked to a fixed target length calibrated for optimal script
              generation, dynamic response parsing, and high-cohesion game loop
              logic.
            </div>
          </div>

          {/* Informational tip box */}
          <div className="bg-blue-50/50 p-3 border border-blue-200/40 rounded flex gap-2 text-[11px] text-slate-800 leading-relaxed mt-1">
            <Brain className="w-4 h-4 text-neutral-600 flex-shrink-0" />
            <span>
              <b>Design Tip:</b> Compiling with a model natively offering
              millions of context tokens ensures zero-flicker state reload of
              the full RPG schema and source assets on every update cycle.
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: DETAILED MODELS MATRIX */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="font-serif font-black text-xs text-neutral-800 border-b border-stone-100 pb-2 flex justify-between items-center uppercase">
            <span className="flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-black" /> Hardware Capacity
              Registry
            </span>
            <span className="text-[10px] text-stone-500 font-normal">
              Active Simulation Testing
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {modelsList.map((model) => {
              const isExceeded = totalTokens > model.maxTokens;
              const usedPercentage = Math.min(
                (totalTokens / model.maxTokens) * 100,
                100,
              );

              // Select color indicators dynamically
              let barColor = 'bg-stone-500';
              let badgeStyle = 'bg-stone-100 text-stone-800 border-stone-300';
              let statusLabel = 'SUPPORTED';

              if (isExceeded) {
                barColor = 'bg-red-500';
                badgeStyle =
                  'bg-red-100 text-red-900 border-red-300 font-extrabold animation-pulse';
                statusLabel = '⚠️ OUT OF BOUNDS';
              } else if (usedPercentage > 85) {
                barColor = 'bg-amber-500';
                badgeStyle =
                  'bg-amber-100 text-amber-900 border-amber-300 font-bold';
                statusLabel = '⚡ DEEP WARNING';
              } else if (usedPercentage > 0) {
                barColor = model.name.includes('Gemini')
                  ? 'bg-indigo-600'
                  : 'bg-neutral-800';
                badgeStyle = model.name.includes('Gemini')
                  ? 'bg-indigo-100 text-indigo-900 border-indigo-200'
                  : 'bg-stone-100 text-stone-900 border-stone-300';
                statusLabel = '✓ OPTIMAL';
              }

              return (
                <div
                  key={model.name}
                  className={`p-3.5 border rounded flex flex-col gap-2.5 transition-colors duration-150 ${isExceeded ? 'border-red-250 bg-red-500/5' : 'border-stone-200 bg-white'}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-serif font-black text-xs text-black">
                          {model.name}
                        </span>
                        <span className="text-[9.5px] text-stone-400">
                          by {model.provider}
                        </span>
                      </div>
                      <p className="text-[10px] text-stone-500 select-all leading-normal mt-0.5">
                        {model.flavor}
                      </p>
                    </div>
                    <span
                      className={`text-[9.5px] border font-bold px-2 py-0.5 rounded uppercase tracking-wide flex-shrink-0 ${badgeStyle}`}
                    >
                      {statusLabel}
                    </span>
                  </div>

                  {/* Micro Progress Bar */}
                  <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden border border-stone-200">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${barColor}`}
                      style={{ width: `${usedPercentage}%` }}
                    />
                  </div>

                  {/* Specific limit info showing all units simultaneously */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] font-mono mt-0.5 gap-1.5">
                    <div className="text-stone-500 flex flex-wrap gap-x-1.5">
                      <span>Limit:</span>
                      <b className="text-stone-900">
                        {model.maxTokens.toLocaleString()} tx
                      </b>
                      <span className="text-stone-300">|</span>
                      <span>
                        {Math.round(model.maxTokens * 0.75).toLocaleString()}{' '}
                        words
                      </span>
                      <span className="text-stone-300">|</span>
                      <span>
                        {((model.maxTokens * 0.75) / 500).toLocaleString(
                          undefined,
                          { maximumFractionDigits: 0 },
                        )}{' '}
                        pages
                      </span>
                    </div>
                    <span className="text-stone-700 font-bold bg-stone-100 px-1.5 py-0.5 rounded text-[9.5px] whitespace-nowrap">
                      {isExceeded ? '100%' : `${usedPercentage.toFixed(1)}%`}{' '}
                      used
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Safety Compliance Standard Block */}
      <div className="border-t border-black pt-4 mt-2 flex flex-col sm:flex-row justify-between items-start sm:items-center text-[9.5px] text-stone-500 gap-2 select-all">
        <span className="flex items-center gap-1 uppercase select-all">
          <ShieldCheck className="w-3.5 h-3.5 text-stone-700 flex-shrink-0" />{' '}
          Secured Telemetry Compliance: API Limits verified as of late Q2 2026
          specs.
        </span>
        <span className="bg-stone-100 border border-stone-300 px-2.5 py-0.5 rounded text-neutral-800 select-none flex items-center gap-1 font-bold">
          <HelpCircle
            className="w-3"
            style={{ height: '12px', width: '12px' }}
          />{' '}
          Tokenizer Reference Guide
        </span>
      </div>
    </div>
  );
}
