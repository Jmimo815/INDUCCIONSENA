import React from 'react';
import { Printer, Download, Share2, CheckCircle2, Shield, ArrowLeft } from 'lucide-react';
import { ApprenticeProfile } from '../../types/induction';
import { SenaLogo } from '../common/SenaLogo';

interface InductionCertificateProps {
  apprentice: ApprenticeProfile;
  onBack: () => void;
}

export const InductionCertificate: React.FC<InductionCertificateProps> = ({
  apprentice,
  onBack
}) => {
  const result = apprentice.evaluationResult;
  const certificateCode = apprentice.certificateCode || `SENA-IND-2026-${apprentice.fichaId}-${apprentice.documentNumber.slice(-4)}`;
  const issueDate = apprentice.issueDate || new Date().toLocaleDateString('es-CO', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Action controls header (hidden when printing) */}
      <div className="no-print bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a la Inducción</span>
        </button>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[#39A900] hover:bg-[#007832] text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / Guardar en PDF</span>
          </button>
        </div>
      </div>

      {/* Official Certificate Container */}
      <div 
        id="printable-certificate"
        className="bg-white border-8 border-double border-emerald-900/40 rounded-2xl p-8 sm:p-12 shadow-lg max-w-4xl mx-auto relative overflow-hidden"
      >
        {/* Decorative corner borders */}
        <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#39A900]" />
        <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#39A900]" />
        <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#39A900]" />
        <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#39A900]" />

        {/* Faint Background Watermark with Official SENA Logo */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
          <SenaLogo variant="official" className="w-[500px] h-[500px]" />
        </div>

        {/* Certificate Header */}
        <div className="text-center space-y-2 mb-8 relative z-10 border-b border-emerald-900/20 pb-6">
          <div className="flex items-center justify-center gap-4 mb-2">
            <SenaLogo variant="official" className="w-16 h-16 drop-shadow-xs" />
          </div>
          
          <h4 className="text-xs font-bold text-slate-600 uppercase tracking-widest font-heading">
            REPÚBLICA DE COLOMBIA
          </h4>
          <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider font-heading">
            MINISTERIO DEL TRABAJO
          </h4>
          <h2 className="text-xl sm:text-2xl font-heading font-black text-[#005e26] tracking-tight">
            SERVICIO NACIONAL DE APRENDIZAJE - SENA
          </h2>
          <p className="text-xs text-slate-600 font-medium">
            {apprentice.regionalName} · {apprentice.centerName}
          </p>
        </div>

        {/* Body Statement */}
        <div className="text-center space-y-6 relative z-10">
          <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">
            HACE CONSTAR QUE EL APRENDIZ
          </p>

          <div>
            <h1 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 tracking-tight uppercase">
              {apprentice.fullName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-mono mt-1">
              Identificado(a) con {apprentice.documentType} No. {apprentice.documentNumber}
            </p>
          </div>

          <div className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-700 leading-relaxed font-serif">
            Ha cursado, participado y aprobado satisfactoriamente la totalidad de los módulos correspondientes al:
            <div className="my-3 py-2 bg-emerald-50/80 border-y border-emerald-200/80">
              <strong className="text-sm sm:text-base font-heading font-bold text-[#005e26] block uppercase tracking-wide">
                PROCESO DE INDUCCIÓN DE APRENDICES
              </strong>
              <span className="text-xs text-slate-800 font-sans block mt-0.5">
                Programa: <strong>{apprentice.programName}</strong> · Ficha No. <strong>{apprentice.fichaId}</strong>
              </span>
            </div>
            Demostrando conocimiento y apropiación integral de los símbolos institucionales, la misión y visión del SENA, los derechos y deberes estipulados en el Reglamento del Aprendiz (Acuerdo 0009 de 2024 actualizado por el Acuerdo 2 de 2026 del Consejo Directivo Nacional), el Código de Integridad, los procedimientos administrativos y las alternativas de Etapa Productiva.
          </div>

          {/* Academic Result Badge */}
          <div className="inline-flex items-center gap-6 bg-slate-50 border border-slate-200 rounded-xl px-6 py-3 text-left">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Juicio Evaluativo</span>
              <span className="text-sm font-bold text-[#007832] flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                APROBADO (COMPETENTE)
              </span>
            </div>

            <div className="h-8 w-px bg-slate-200" />

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Puntaje Obtenido</span>
              <span className="text-sm font-black text-slate-900">
                {result?.score ?? 93}%
              </span>
            </div>

            <div className="h-8 w-px bg-slate-200" />

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Fecha de Expedición</span>
              <span className="text-xs font-semibold text-slate-700">
                {issueDate}
              </span>
            </div>
          </div>

          {/* Signatures & QR Code Section */}
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end text-center mt-6 border-t border-slate-200">
            {/* Signature 1 */}
            <div className="space-y-1">
              <div className="font-serif italic text-base text-slate-800 font-bold border-b border-slate-300 pb-1 mb-1">
                Subdirección de Centro
              </div>
              <p className="text-[11px] font-bold text-slate-800 uppercase">Subdirector(a) de Centro</p>
              <p className="text-[10px] text-slate-500">{apprentice.centerName}</p>
            </div>

            {/* QR Code & Security Stamp (Center) */}
            <div className="flex flex-col items-center justify-center">
              {/* Synthetic Vector QR Code representation */}
              <div className="w-20 h-20 bg-white p-1.5 border border-slate-300 rounded shadow-xs mb-1.5 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-slate-900">
                  {/* Top-left marker */}
                  <rect x="5" y="5" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="6" />
                  <rect x="13" y="13" width="14" height="14" />
                  {/* Top-right marker */}
                  <rect x="65" y="5" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="6" />
                  <rect x="73" y="13" width="14" height="14" />
                  {/* Bottom-left marker */}
                  <rect x="5" y="65" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="6" />
                  <rect x="13" y="73" width="14" height="14" />
                  {/* Data matrix dots */}
                  <rect x="42" y="8" width="8" height="8" />
                  <rect x="52" y="18" width="6" height="6" />
                  <rect x="42" y="28" width="8" height="8" />
                  <rect x="8" y="44" width="8" height="8" />
                  <rect x="24" y="46" width="6" height="6" />
                  <rect x="44" y="44" width="12" height="12" fill="#39A900" />
                  <rect x="62" y="44" width="8" height="8" />
                  <rect x="76" y="46" width="6" height="6" />
                  <rect x="84" y="56" width="8" height="8" />
                  <rect x="42" y="66" width="6" height="6" />
                  <rect x="54" y="74" width="8" height="8" />
                  <rect x="72" y="72" width="10" height="10" />
                  <rect x="86" y="86" width="6" height="6" />
                </svg>
              </div>
              <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                {certificateCode}
              </span>
              <span className="text-[9px] text-[#007832] font-semibold">
                Verificable en SofiaPlus
              </span>
            </div>

            {/* Signature 2 */}
            <div className="space-y-1">
              <div className="font-serif italic text-base text-slate-800 font-bold border-b border-slate-300 pb-1 mb-1">
                Coordinación Académica
              </div>
              <p className="text-[11px] font-bold text-slate-800 uppercase">Coordinador(a) Académico(a)</p>
              <p className="text-[10px] text-slate-500">Gestión de la Formación Profesional</p>
            </div>
          </div>
        </div>

        {/* Footer legal note */}
        <div className="mt-8 pt-4 border-t border-slate-200 text-center text-[10px] text-slate-400">
          Documento expedido de conformidad con el Reglamento del Aprendiz SENA vigente (Acuerdo 0009 de 2024 del Consejo Directivo Nacional). Código de autenticidad generado por el sistema de inducción institucional.
        </div>
      </div>
    </div>
  );
};
