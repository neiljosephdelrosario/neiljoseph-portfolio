'use client';

import { useEffect, useRef, useState } from 'react';

type ProjectBrief = {
  services: string[];
  projectName: string;
  projectGoals: string;
  email: string;
};

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const totalSteps = 4;

  const [formData, setFormData] = useState<ProjectBrief>({
    services: [],
    projectName: '',
    projectGoals: '',
    email: '',
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    sectionRef.current?.querySelectorAll('.reveal').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleInputChange = (field: keyof ProjectBrief, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      access_key: "94adc736-fc5d-4a60-8287-14d54b4697fd",
      subject: `New Project Brief: ${formData.projectName || 'Untitled Brand'}`,
      from_name: "Portfolio Hub Brief System",
      projectName: formData.projectName || 'Not provided',
      servicesNeeded: formData.services.length ? formData.services.join(', ') : 'None selected',
      projectGoals: formData.projectGoals || 'Not provided',
      clientEmail: formData.email,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Clean and reliable FK Grotesk font stack variable
  const fontStack = "var(--font-fk-grotesk), 'FK Grotesk', sans-serif";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="font-bold"
      style={{
        background: 'var(--bg)',
        color: 'var(--text)',
        padding: '10rem 2rem',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        fontFamily: fontStack,
      }}
    >
      <div className="max-w-4xl mx-auto w-full">

        {/* Title */}
        <div className="text-center mb-12">
          <h2
            className="reveal font-bold lowercase tracking-wide mb-4"
            style={{ 
              fontFamily: fontStack,
              fontSize: 'clamp(1.8rem, 4.5vw, 3.5rem)', 
              lineHeight: 0.9, 
              color: 'var(--text)' 
            }}
          >
            {isSubmitted ? 'project brief sent' : 'start a project with me'}
          </h2>

          {/* Progress bar */}
          <div
            className="w-full max-w-md mx-auto h-[2px] mt-6 relative overflow-hidden"
            style={{ background: 'var(--bg-card)' }}
          >
            <div
              className="h-full transition-all duration-500 ease-out"
              style={{
                width: isSubmitted ? '100%' : `${(step / totalSteps) * 100}%`,
                background: 'var(--text)',
              }}
            />
          </div>
        </div>

        {/* Wizard box */}
        <div
          className="reveal rounded-xl p-8 md:p-12 max-w-2xl mx-auto shadow-2xl transition-all duration-300 font-bold"
          style={{
            fontFamily: fontStack,
            background: 'var(--bg-card-alt)',
            border: '1px solid var(--border-alt)',
            minHeight: '380px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center text-center py-8">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                style={{
                  border: '1px solid var(--text)',
                  background: 'rgba(128,128,128,0.05)',
                }}
              >
                <span className="text-xl font-bold" style={{ color: 'var(--text)' }}>✓</span>
              </div>
              <h3 className="font-bold text-2xl mb-2 tracking-tight lowercase" style={{ color: 'var(--text)', fontFamily: fontStack }}>
                thank you, brief compiled.
              </h3>
              <p className="text-sm max-w-sm leading-relaxed tracking-normal font-bold" style={{ color: 'var(--text-eyebrow)', fontFamily: fontStack }}>
                Data was securely sent directly to my workspace. I'll get back to you shortly!
              </p>
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setIsSubmitted(false);
                  setFormData({ services: [], projectName: '', projectGoals: '', email: '' });
                }}
                className="mt-8 text-xs font-bold tracking-[0.15em] lowercase transition-colors duration-200"
                style={{ color: 'var(--text-subtle)', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: fontStack }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--text)')}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = 'var(--text-subtle)')}
              >
                ← clear / setup another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col flex-grow justify-between gap-8">

              {/* STEP 1 */}
              {step === 1 && (
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="font-bold text-xl mb-1 tracking-tight lowercase" style={{ color: 'var(--text)', fontFamily: fontStack }}>what do you need?</h3>
                    <p className="text-sm tracking-normal font-bold" style={{ color: 'var(--text-eyebrow)', fontFamily: fontStack }}>Select all that apply to your project requirements.</p>
                  </div>
                  <div className="flex flex-col gap-3 mt-2">
                    {['Frontend Development', 'UI/UX Interactive Design', 'Fullstack Development', 'Mobile Development', 'Backend Development', 'Other'].map(service => {
                      const isSelected = formData.services.includes(service);
                      return (
                        <button
                          type="button"
                          key={service}
                          onClick={() => handleServiceToggle(service)}
                          className="w-full text-left p-4 rounded-lg text-sm font-bold transition-all duration-200 flex items-center justify-between"
                          style={{
                            fontFamily: fontStack,
                            background: isSelected ? 'var(--bg-card)' : 'var(--bg-secondary)',
                            border: `1px solid ${isSelected ? 'var(--text)' : 'var(--border)'}`,
                            color: isSelected ? 'var(--text)' : 'var(--text-muted)',
                            cursor: 'pointer',
                          }}
                        >
                          {service}
                          <div
                            className="w-4 h-4 rounded-sm flex items-center justify-center transition-all"
                            style={{
                              border: `1px solid ${isSelected ? 'var(--text)' : 'var(--border)'}`,
                              background: isSelected ? 'var(--text)' : 'transparent',
                            }}
                          >
                            {isSelected && (
                              <span className="text-[10px] font-bold" style={{ color: 'var(--bg)' }}>✓</span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="flex flex-col gap-5">
                  <div>
                    <h3 className="font-bold text-xl mb-1 tracking-tight lowercase" style={{ color: 'var(--text)', fontFamily: fontStack }}>project name</h3>
                    <p className="text-sm tracking-normal font-bold" style={{ color: 'var(--text-eyebrow)', fontFamily: fontStack }}>Tell me the name of your brand or initiative.</p>
                  </div>
                  <input
                    type="text"
                    autoFocus
                    placeholder="e.g. Borealis Graphite"
                    value={formData.projectName}
                    onChange={(e) => handleInputChange('projectName', e.target.value)}
                    className="w-full rounded-lg p-4 text-base outline-none transition-colors mt-4 font-bold"
                    style={{
                      fontFamily: fontStack,
                      background: 'var(--input-bg)',
                      border: '1px solid var(--input-border)',
                      color: 'var(--text)',
                    }}
                    onFocus={e => (e.target.style.borderColor = 'var(--text)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--input-border)')}
                  />
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="flex flex-col gap-5">
                  <div>
                    <h3 className="font-bold text-xl mb-1 tracking-tight lowercase" style={{ color: 'var(--text)', fontFamily: fontStack }}>project goals</h3>
                    <p className="text-sm tracking-normal font-bold" style={{ color: 'var(--text-eyebrow)', fontFamily: fontStack }}>Briefly describe your timeline objectives or features.</p>
                  </div>
                  <textarea
                    rows={4}
                    autoFocus
                    placeholder="Describe your design specifications or software details..."
                    value={formData.projectGoals}
                    onChange={(e) => handleInputChange('projectGoals', e.target.value)}
                    className="w-full rounded-lg p-4 text-base outline-none transition-colors resize-none mt-4 font-bold"
                    style={{
                      fontFamily: fontStack,
                      background: 'var(--input-bg)',
                      border: '1px solid var(--input-border)',
                      color: 'var(--text)',
                    }}
                    onFocus={e => (e.target.style.borderColor = 'var(--text)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--input-border)')}
                  />
                </div>
              )}

              {/* STEP 4 */}
              {step === 4 && (
                <div className="flex flex-col gap-5">
                  <div>
                    <h3 className="font-bold text-xl mb-1 tracking-tight lowercase" style={{ color: 'var(--text)', fontFamily: fontStack }}>contact email</h3>
                    <p className="text-sm tracking-normal font-bold" style={{ color: 'var(--text-eyebrow)', fontFamily: fontStack }}>Where should I send the interactive scope proposal?</p>
                  </div>
                  <input
                    type="email"
                    required
                    autoFocus
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full rounded-lg p-4 text-base outline-none transition-colors mt-4 font-bold"
                    style={{
                      fontFamily: fontStack,
                      background: 'var(--input-bg)',
                      border: '1px solid var(--input-border)',
                      color: 'var(--text)',
                    }}
                    onFocus={e => (e.target.style.borderColor = 'var(--text)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--input-border)')}
                  />
                </div>
              )}

              {/* Navigation buttons */}
              <div
                className="flex items-center justify-between pt-6 mt-auto"
                style={{ borderTop: '1px solid var(--border)' }}
              >
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={isSubmitting}
                    className="font-bold text-sm tracking-wide px-6 py-3 rounded-md transition-colors disabled:opacity-30 lowercase"
                    style={{ fontFamily: fontStack, background: 'var(--bg-card)', color: 'var(--text)', border: 'none', cursor: 'pointer' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--border)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'var(--bg-card)')}
                  >
                    back
                  </button>
                ) : (
                  <div />
                )}

                {step < totalSteps ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={step === 1 && formData.services.length === 0}
                    className="font-bold text-sm tracking-wide px-8 py-3 rounded-md transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none lowercase"
                    style={{ fontFamily: fontStack, background: 'var(--text)', color: 'var(--bg)', border: 'none', cursor: 'pointer' }}
                  >
                    continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!formData.email || isSubmitting}
                    className="font-bold text-sm tracking-wide px-8 py-3 rounded-md transition-all active:scale-95 disabled:opacity-40 lowercase"
                    style={{ fontFamily: fontStack, background: 'var(--text)', color: 'var(--bg)', border: 'none', cursor: 'pointer' }}
                  >
                    {isSubmitting ? 'sending...' : 'send project brief'}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}