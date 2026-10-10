import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { PIPELINE_STEPS } from '../../lib/tracking';

interface PipelineTrackerProps {
  status: string;
}

export const PipelineTracker: React.FC<PipelineTrackerProps> = ({ status }) => {
  const currentIdx = PIPELINE_STEPS.indexOf(status as (typeof PIPELINE_STEPS)[number]);

  return (
    <ol className="space-y-3">
      {PIPELINE_STEPS.map((step, idx) => {
        const isCompleted = idx <= currentIdx;
        const isCurrent = idx === currentIdx;

        return (
          <li
            key={step}
            aria-current={isCurrent ? 'step' : undefined}
            className={`p-3.5 rounded-xl border flex items-center justify-between text-sm transition-colors ${
              isCurrent
                ? 'bg-blue-50 border-blue-600 text-blue-950 font-extrabold shadow-xs'
                : isCompleted
                ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900 font-semibold'
                : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  isCompleted ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}
              >
                {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
              </div>
              <span>{step}</span>
            </div>

            {isCurrent && (
              <span className="text-xs text-blue-700 font-bold bg-blue-100 px-2.5 py-0.5 rounded-full">
                Etapa Actual
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
};
