/**
 * LegacyGeoFlow.tsx
 *
 * Self-contained wrapper for the original 3-step GEO wizard
 * (Diagnosis → Strategy → Production) and the Standalone Mode.
 *
 * All business logic is unchanged — this component is a structural
 * extraction from the original App.tsx. Do not add new features here;
 * new work goes into the V1/V2 pages.
 */
import React from 'react';
import { useWorkflowStore } from '../store/workflowStore';
import { translations } from '../i18n/translations';
import { Target, BookOpen, PenTool, Zap } from 'lucide-react';
import StepDiagnosis from '../components/StepDiagnosis';
import StepStrategy from '../components/StepStrategy';
import StepProduction from '../components/StepProduction';
import StandaloneMode from '../components/StandaloneMode';

const LegacyGeoFlow: React.FC = () => {
  const {
    currentStep,
    setStep,
    diagnosisConfirmed,
    strategyConfirmed,
    uiLang,
    standaloneMode,
    setStandaloneMode,
  } = useWorkflowStore();

  const t = translations[uiLang];

  const canGoToStep = (step: number): boolean => {
    if (step === 1) return true;
    if (step === 2) return diagnosisConfirmed;
    if (step === 3) return strategyConfirmed;
    return false;
  };

  const handleStepClick = (step: 1 | 2 | 3) => {
    if (canGoToStep(step)) setStep(step);
  };

  const STEPS = [
    { num: 1 as const, label: t.steps.diagnosis,  icon: Target   },
    { num: 2 as const, label: t.steps.strategy,   icon: BookOpen },
    { num: 3 as const, label: t.steps.production, icon: PenTool  },
  ] as const;

  return (
    <div className="flex flex-col min-h-full">
      {/* ── Sub-bar: Legacy badge + Standalone toggle ────────────── */}
      <div className="bg-white border-b border-slate-200 px-6 py-2 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-black uppercase tracking-[0.15em] bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
            Legacy GEO Flow
          </span>
          <span className="text-[10px] text-slate-400">
            Original 3-step wizard — unchanged
          </span>
        </div>
        <button
          onClick={() => setStandaloneMode(!standaloneMode)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-[10px] font-black uppercase tracking-widest border transition-all ${
            standaloneMode
              ? 'bg-[#ffd200] text-[#03234b] border-[#ffd200]'
              : 'bg-slate-100 text-slate-600 border-slate-200 hover:text-slate-900 hover:border-slate-300'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          {standaloneMode ? t.standalone.backToWizard : t.standalone.modeLabel}
        </button>
      </div>

      {/* ── Wizard Progress Bar (hidden in Standalone mode) ─────── */}
      {!standaloneMode && (
        <div className="bg-white border-b border-slate-200 py-5 shadow-sm flex-shrink-0">
          <div className="max-w-3xl mx-auto px-4">
            <div className="flex items-center justify-between relative">
              {/* Track background */}
              <div className="absolute top-1/2 left-[16.6%] right-[16.6%] h-0.5 bg-slate-100 -translate-y-1/2 z-0" />
              {/* Track fill */}
              <div
                className="absolute top-1/2 left-[16.6%] h-0.5 bg-[#3cb4e6] -translate-y-1/2 z-0 transition-all duration-700 ease-in-out"
                style={{ width: `${(currentStep - 1) * 33.3}%` }}
              />
              {STEPS.map((step) => {
                const isActive = currentStep === step.num;
                const isPast   = currentStep > step.num;
                const canClick = canGoToStep(step.num);
                return (
                  <div
                    key={step.num}
                    className="relative z-10 flex flex-col items-center gap-1.5 bg-white px-3"
                  >
                    <button
                      onClick={() => handleStepClick(step.num)}
                      disabled={!canClick && !isActive}
                      className={`w-11 h-11 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                        isActive
                          ? 'bg-[#03234b] text-white shadow-lg ring-4 ring-[#3cb4e6]/20 scale-110'
                          : isPast
                          ? 'bg-[#3cb4e6] text-white hover:bg-[#2090bf] cursor-pointer'
                          : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                      }`}
                    >
                      <step.icon
                        className={`w-5 h-5 ${isActive ? 'animate-pulse' : ''}`}
                      />
                    </button>
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider transition-colors duration-300 ${
                        isActive
                          ? 'text-[#03234b]'
                          : isPast
                          ? 'text-[#3cb4e6]'
                          : 'text-slate-300'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Main Step Content ────────────────────────────────────── */}
      <main className="flex-1 w-full max-w-[95%] mx-auto px-4 py-8">
        {standaloneMode ? (
          <StandaloneMode t={t} />
        ) : (
          <>
            {currentStep === 1 && <StepDiagnosis t={t} />}
            {currentStep === 2 && <StepStrategy t={t} />}
            {currentStep === 3 && <StepProduction t={t} />}
          </>
        )}
      </main>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="border-t border-slate-200 py-4 text-center bg-white flex-shrink-0">
        <p className="text-[10px] text-[#8191a5] font-bold uppercase tracking-[0.15em]">
          {t.footer}
        </p>
        <p className="text-[10px] text-[#c0c8d2] mt-1">
          Created by{' '}
          <a
            href="mailto:Yude.jiang@st.com"
            className="hover:text-[#3cb4e6] transition-colors"
          >
            Yude.jiang@st.com
          </a>
        </p>
      </footer>
    </div>
  );
};

export default LegacyGeoFlow;
