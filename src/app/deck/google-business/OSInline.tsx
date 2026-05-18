'use client';

import { useState, useRef } from 'react';
import SignaturePad, { type SignaturePadHandle } from './SignaturePad';

interface ServiceItem {
  id: number;
  description: string;
  qty: string;
  price: string;
}

const DEFAULT_SERVICES: ServiceItem[] = [
  { id: 1, description: 'Configuração do Perfil da Empresa no Google', qty: '1', price: '' },
  { id: 2, description: 'Estratégia de avaliações', qty: '1', price: '' },
  { id: 3, description: 'Acompanhamento mensal', qty: '1 mês', price: '' },
];

function today() { return new Date().toLocaleDateString('pt-BR'); }
function osNumber() {
  const d = new Date();
  return String(d.getFullYear()).slice(2) + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0') + '-' + String(d.getHours()).padStart(2, '0') + String(d.getMinutes()).padStart(2, '0');
}
function fmtBRL(v: string) {
  const n = parseFloat(v.replace(',', '.'));
  return isNaN(n) ? '' : n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function calcTotal(items: ServiceItem[]) {
  const s = items.reduce((a, i) => { const n = parseFloat(i.price.replace(',', '.')); return a + (isNaN(n) ? 0 : n); }, 0);
  return s > 0 ? fmtBRL(String(s)) : '';
}

export default function OSInline() {
  const [osNum] = useState(osNumber);
  const [date] = useState(today);

  // Empresa
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [razaoSocial, setRazaoSocial] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [endereco, setEndereco] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cep, setCep] = useState('');
  // Contato
  const [responsavel, setResponsavel] = useState('');
  const [telefone, setTelefone] = useState('');
  const [emailVal, setEmailVal] = useState('');

  const [items, setItems] = useState<ServiceItem[]>(DEFAULT_SERVICES);
  const [obs, setObs] = useState('');
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const sigClientRef = useRef<SignaturePadHandle>(null);
  const sigBrunoRef = useRef<SignaturePadHandle>(null);

  const upd = (id: number, f: keyof ServiceItem, v: string) =>
    setItems(p => p.map(it => it.id === id ? { ...it, [f]: v } : it));
  const addItem = () => setItems(p => [...p, { id: Date.now(), description: '', qty: '1', price: '' }]);
  const rmItem = (id: number) => setItems(p => p.filter(it => it.id !== id));
  const total = calcTotal(items);

  const generatePdfBase64 = async (): Promise<string | null> => {
    try {
      const { default: jsPDF } = await import('jspdf');
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const W = 210;
      const m = 20;
      const cW = W - m * 2;

      type RGB = [number, number, number];
      const orange: RGB     = [255, 92,  0  ];
      const black: RGB      = [17,  17,  17 ];
      const gray: RGB       = [110, 110, 110];
      const light: RGB      = [160, 160, 160];
      const vLight: RGB     = [247, 247, 247];
      const divider: RGB    = [228, 228, 228];

      // ── Orange top stripe ──────────────────────────────
      doc.setFillColor(...orange);
      doc.rect(0, 0, W, 3.5, 'F');

      // ── Header ────────────────────────────────────────
      let y = 14;

      // Logo
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(19);
      doc.setTextColor(...black);
      doc.text('SALTO', m, y);
      doc.setTextColor(...orange);
      doc.text('·', m + doc.getTextWidth('SALTO') + 0.3, y);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...light);
      doc.text('saltoup.com', m, y + 5.5);

      // OS block (right)
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(...orange);
      doc.text('ORDEM DE SERVIÇO', W - m, y - 5, { align: 'right' });
      doc.setFontSize(18);
      doc.setTextColor(...black);
      doc.text(`#${osNum}`, W - m, y + 0.5, { align: 'right' });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(...light);
      doc.text(date, W - m, y + 6.5, { align: 'right' });

      y += 15;
      doc.setDrawColor(...divider);
      doc.setLineWidth(0.3);
      doc.line(m, y, W - m, y);
      y += 8;

      // ── Client data ───────────────────────────────────
      const fields: { label: string; value: string }[] = [
        ...(nomeFantasia ? [{ label: 'NOME FANTASIA',        value: nomeFantasia }] : []),
        ...(razaoSocial  ? [{ label: 'RAZÃO SOCIAL',         value: razaoSocial  }] : []),
        ...(cnpj         ? [{ label: 'CNPJ',                 value: cnpj         }] : []),
        ...(endereco     ? [{ label: 'ENDEREÇO',             value: endereco     }] : []),
        ...(bairro       ? [{ label: 'BAIRRO',               value: bairro       }] : []),
        ...((cidade || estado) ? [{ label: 'CIDADE / ESTADO', value: [cidade, estado].filter(Boolean).join(' — ') }] : []),
        ...(cep          ? [{ label: 'CEP',                  value: cep          }] : []),
        ...(responsavel  ? [{ label: 'RESPONSÁVEL',          value: responsavel  }] : []),
        ...(telefone     ? [{ label: 'TELEFONE / WHATSAPP',  value: telefone     }] : []),
        ...(emailVal     ? [{ label: 'E-MAIL',               value: emailVal     }] : []),
      ];

      if (fields.length > 0) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7);
        doc.setTextColor(...orange);
        doc.text('DADOS DO CLIENTE', m, y);
        y += 5;

        const rowH = 11;
        const rows = Math.ceil(fields.length / 2);
        const cardH = rows * rowH + 10;

        doc.setFillColor(...vLight);
        doc.roundedRect(m, y, cW, cardH, 2, 2, 'F');

        fields.forEach((f, i) => {
          const col = i % 2;
          const row = Math.floor(i / 2);
          const cx  = m + 6 + col * (cW / 2);
          const fy  = y + 6 + row * rowH;
          const maxW = cW / 2 - 12;

          doc.setFont('helvetica', 'bold');
          doc.setFontSize(6.5);
          doc.setTextColor(...light);
          doc.text(f.label, cx, fy);

          doc.setFont('helvetica', 'bold');
          doc.setFontSize(9);
          doc.setTextColor(...black);
          doc.text(doc.splitTextToSize(f.value, maxW)[0] as string, cx, fy + 5);

          if (col === 0 && i + 1 < fields.length) {
            doc.setDrawColor(...divider);
            doc.setLineWidth(0.2);
            doc.line(m + cW / 2, fy - 1, m + cW / 2, fy + rowH - 2);
          }
        });

        for (let r = 1; r < rows; r++) {
          doc.setDrawColor(...divider);
          doc.setLineWidth(0.2);
          doc.line(m + 5, y + 6 + r * rowH - 2, m + cW - 5, y + 6 + r * rowH - 2);
        }

        y += cardH + 8;
      }

      // ── Services table ────────────────────────────────
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(...orange);
      doc.text('SERVIÇOS', m, y);
      y += 4;

      // Header row
      doc.setFillColor(...black);
      doc.rect(m, y, cW, 8, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(255, 255, 255);
      doc.text('DESCRIÇÃO', m + 4, y + 5.5);
      doc.text('QTD', m + cW * 0.68, y + 5.5, { align: 'center' });
      doc.text('VALOR', W - m - 4, y + 5.5, { align: 'right' });
      y += 8;

      const validItems = items.filter(i => i.description);
      validItems.forEach((item, idx) => {
        const rH = 8;
        doc.setFillColor(idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 250);
        doc.rect(m, y, cW, rH, 'F');

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(...black);
        const descLine = (doc.splitTextToSize(`${idx + 1}. ${item.description}`, cW * 0.62) as string[])[0];
        doc.text(descLine, m + 4, y + 5.5);

        doc.setTextColor(...gray);
        doc.text(item.qty || '1', m + cW * 0.68, y + 5.5, { align: 'center' });

        if (item.price) {
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(...black);
          doc.text(`R$ ${fmtBRL(item.price)}`, W - m - 4, y + 5.5, { align: 'right' });
        } else {
          doc.setTextColor(...light);
          doc.text('—', W - m - 4, y + 5.5, { align: 'right' });
        }

        doc.setDrawColor(...divider);
        doc.setLineWidth(0.2);
        doc.line(m, y + rH, W - m, y + rH);
        y += rH;
      });

      if (total) {
        doc.setFillColor(...orange);
        doc.rect(m, y, cW, 10, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(255, 255, 255);
        doc.text('TOTAL', m + 4, y + 6.5);
        doc.setFontSize(13);
        doc.text(`R$ ${total}`, W - m - 4, y + 7, { align: 'right' });
        y += 10;
      }

      y += 8;

      // ── Observations ─────────────────────────────────
      if (obs) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7);
        doc.setTextColor(...orange);
        doc.text('OBSERVAÇÕES', m, y);
        y += 5;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(...gray);
        const obsLines = doc.splitTextToSize(obs, cW) as string[];
        doc.text(obsLines, m, y);
        y += obsLines.length * 5 + 6;
      }

      // ── Signatures ────────────────────────────────────
      const sigY = Math.max(y + 12, 228);
      const sigW = 72;
      const sigH = 22;

      const clientSigData = sigClientRef.current?.getDataURL() ?? null;
      const brunoSigData  = sigBrunoRef.current?.getDataURL()  ?? null;

      if (clientSigData) {
        try { doc.addImage(clientSigData, 'PNG', m, sigY - sigH, sigW, sigH); } catch { /* skip */ }
      }
      doc.setDrawColor(...black);
      doc.setLineWidth(0.5);
      doc.line(m, sigY, m + sigW, sigY);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(...black);
      doc.text(responsavel || nomeFantasia || 'Cliente', m, sigY + 5);
      if (nomeFantasia && responsavel) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(...light);
        doc.text(nomeFantasia, m, sigY + 9.5);
      }

      if (brunoSigData) {
        try { doc.addImage(brunoSigData, 'PNG', W - m - sigW, sigY - sigH, sigW, sigH); } catch { /* skip */ }
      }
      doc.setDrawColor(...black);
      doc.setLineWidth(0.5);
      doc.line(W - m - sigW, sigY, W - m, sigY);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(...black);
      doc.text('Bruno Vieira', W - m - sigW, sigY + 5);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(...light);
      doc.text('Salto · saltoup.com', W - m - sigW, sigY + 9.5);

      // ── Footer ────────────────────────────────────────
      doc.setFillColor(...orange);
      doc.rect(0, 288.5, W, 1.5, 'F');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(190, 190, 190);
      doc.text(`Gerado por Salto · saltoup.com · OS #${osNum} · ${date}`, W / 2, 285, { align: 'center' });

      return doc.output('datauristring').split(',')[1];
    } catch (e) {
      console.error('PDF generation error:', e);
      return null;
    }
  };

  const sendEmail = async () => {
    setEmailStatus('sending');
    try {
      const pdfBase64 = await generatePdfBase64();
      const res = await fetch('/api/os-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ osNum, date, nomeFantasia, razaoSocial, cnpj, endereco, bairro, cidade, estado, cep, responsavel, telefone, email: emailVal, items, obs, total, pdfBase64 }),
      });
      setEmailStatus(res.ok ? 'sent' : 'error');
      if (res.ok) setTimeout(() => setEmailStatus('idle'), 4000);
    } catch {
      setEmailStatus('error');
    }
  };

  const buildText = () => [
    `*ORDEM DE SERVIÇO — Salto*`,
    `OS #${osNum} · ${date}`,
    ``,
    nomeFantasia ? `*Nome Fantasia:* ${nomeFantasia}` : '',
    razaoSocial  ? `*Razão Social:* ${razaoSocial}`   : '',
    cnpj         ? `*CNPJ:* ${cnpj}`                   : '',
    endereco     ? `*Endereço:* ${endereco}`             : '',
    bairro       ? `*Bairro:* ${bairro}`                 : '',
    (cidade || estado) ? `*Cidade/UF:* ${[cidade, estado].filter(Boolean).join(' — ')}` : '',
    cep          ? `*CEP:* ${cep}`                       : '',
    responsavel  ? `*Responsável:* ${responsavel}`       : '',
    telefone     ? `*Telefone:* ${telefone}`             : '',
    emailVal     ? `*E-mail:* ${emailVal}`               : '',
    ``,
    `*SERVIÇOS:*`,
    ...items.filter(i => i.description).map((i, n) => `${n + 1}. ${i.description}${i.price ? ` — R$ ${fmtBRL(i.price)}` : ''}`),
    ``,
    total ? `*TOTAL: R$ ${total}*` : '',
    obs ? `\n_${obs}_` : '',
    `\nGerado por Salto · saltoup.com`,
  ].filter(Boolean).join('\n');

  const inp: React.CSSProperties = {
    background: 'transparent', border: 'none', borderBottom: '1px solid #e0e0e0',
    outline: 'none', fontSize: 13, color: '#1a1a1a', fontFamily: 'inherit', width: '100%', padding: '3px 0',
  };
  const lbl = (text: string) => (
    <label style={{ fontSize: 9, color: '#bbb', display: 'block', marginBottom: 3, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' as const }}>{text}</label>
  );

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '28px 32px 96px', gap: 16 }}>

      {/* Document card */}
      <div style={{ width: '100%', maxWidth: 680, background: '#fff', borderRadius: 14, padding: '28px 36px', color: '#1a1a1a', boxShadow: '0 16px 60px rgba(0,0,0,0.6)', flexShrink: 0 }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, paddingBottom: 16, borderBottom: '2px solid #111' }}>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="Salto" style={{ height: 22, filter: 'invert(1)', marginBottom: 3, display: 'block' }} />
            <p style={{ fontSize: 10, color: '#999' }}>saltoup.com</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#999', marginBottom: 3 }}>Ordem de Serviço</p>
            <p style={{ fontSize: 18, fontWeight: 900, color: '#111', letterSpacing: -0.5 }}>#{osNum}</p>
            <p style={{ fontSize: 11, color: '#999' }}>{date}</p>
          </div>
        </div>

        {/* Empresa */}
        <div style={{ marginBottom: 18 }}>
          <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#FF5C00', marginBottom: 10 }}>Dados da Empresa</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 24px' }}>
            <div>
              {lbl('Nome Fantasia')}
              <input style={{ ...inp, fontWeight: 700 }} value={nomeFantasia} onChange={e => setNomeFantasia(e.target.value)} placeholder="Nome como é conhecido" />
            </div>
            <div>
              {lbl('Razão Social')}
              <input style={inp} value={razaoSocial} onChange={e => setRazaoSocial(e.target.value)} placeholder="Razão Social Ltda." />
            </div>
            <div>
              {lbl('CNPJ')}
              <input style={inp} value={cnpj} onChange={e => setCnpj(e.target.value)} placeholder="00.000.000/0000-00" />
            </div>
            <div />
          </div>
          {/* Endereço completo */}
          <div style={{ marginTop: 12 }}>
            {lbl('Endereço (Rua, número)')}
            <input style={inp} value={endereco} onChange={e => setEndereco(e.target.value)} placeholder="Rua das Flores, 123" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 52px 110px', gap: '10px 16px', marginTop: 12 }}>
            <div>
              {lbl('Bairro')}
              <input style={inp} value={bairro} onChange={e => setBairro(e.target.value)} placeholder="Centro" />
            </div>
            <div>
              {lbl('Cidade')}
              <input style={inp} value={cidade} onChange={e => setCidade(e.target.value)} placeholder="São Paulo" />
            </div>
            <div>
              {lbl('UF')}
              <input style={inp} value={estado} onChange={e => setEstado(e.target.value.toUpperCase().slice(0, 2))} placeholder="SP" maxLength={2} />
            </div>
            <div>
              {lbl('CEP')}
              <input style={inp} value={cep} onChange={e => setCep(e.target.value)} placeholder="00000-000" />
            </div>
          </div>
        </div>

        {/* Contato */}
        <div style={{ marginBottom: 18, paddingTop: 14, borderTop: '1px solid #f0f0f0' }}>
          <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#FF5C00', marginBottom: 10 }}>Contato / Responsável</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px 24px' }}>
            <div>
              {lbl('Nome')}
              <input style={inp} value={responsavel} onChange={e => setResponsavel(e.target.value)} placeholder="Nome completo" />
            </div>
            <div>
              {lbl('Telefone / WhatsApp')}
              <input style={inp} value={telefone} onChange={e => setTelefone(e.target.value)} placeholder="(11) 9 0000-0000" />
            </div>
            <div>
              {lbl('E-mail')}
              <input style={inp} value={emailVal} onChange={e => setEmailVal(e.target.value)} placeholder="email@empresa.com" type="email" />
            </div>
          </div>
        </div>

        {/* Services */}
        <div style={{ marginBottom: 16, paddingTop: 14, borderTop: '1px solid #f0f0f0' }}>
          <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#FF5C00', marginBottom: 8 }}>Serviços</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 64px 90px 24px', gap: '0 10px', padding: '6px 0', borderBottom: '1px solid #eee', marginBottom: 4 }}>
            {['Descrição', 'Qtd', 'Valor (R$)', ''].map(h => (
              <p key={h} style={{ fontSize: 9, fontWeight: 700, color: '#bbb', letterSpacing: 2, textTransform: 'uppercase', textAlign: h === 'Valor (R$)' ? 'right' : 'left' }}>{h}</p>
            ))}
          </div>
          {items.map(item => (
            <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '1fr 64px 90px 24px', gap: '0 10px', padding: '8px 0', borderBottom: '1px solid #f5f5f5', alignItems: 'center' }}>
              <input style={inp} value={item.description} onChange={e => upd(item.id, 'description', e.target.value)} placeholder="Serviço" />
              <input style={{ ...inp, textAlign: 'center' }} value={item.qty} onChange={e => upd(item.id, 'qty', e.target.value)} />
              <input style={{ ...inp, textAlign: 'right', fontWeight: 700 }} value={item.price} onChange={e => upd(item.id, 'price', e.target.value)} placeholder="0,00" />
              <button onClick={() => rmItem(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ddd', fontSize: 16, lineHeight: 1, padding: 0 }}>×</button>
            </div>
          ))}
          <button onClick={addItem} style={{ marginTop: 8, padding: '5px 12px', borderRadius: 6, border: '1px dashed #e0e0e0', background: 'transparent', color: '#bbb', fontSize: 11, cursor: 'pointer' }}>+ item</button>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12, paddingTop: 12, borderTop: '2px solid #111' }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#bbb', marginBottom: 2 }}>Total</p>
              <p style={{ fontSize: 22, fontWeight: 900, color: total ? '#FF5C00' : '#ddd' }}>{total ? `R$ ${total}` : 'R$ —'}</p>
            </div>
          </div>
        </div>

        {/* Obs */}
        <div style={{ marginBottom: 20, paddingTop: 14, borderTop: '1px solid #f0f0f0' }}>
          <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#FF5C00', marginBottom: 6 }}>Observações</p>
          <input style={{ ...inp, fontSize: 12 }} value={obs} onChange={e => setObs(e.target.value)} />
        </div>

        {/* Signatures */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, paddingTop: 20, borderTop: '1px solid #eee' }}>
          <SignaturePad ref={sigClientRef} label={responsavel || nomeFantasia || 'Assinatura do cliente'} height={64} />
          <SignaturePad ref={sigBrunoRef} label="Bruno Vieira — Salto" height={64} />
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', paddingBottom: 16 }}>
        <button onClick={() => window.print()} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 20px', borderRadius: 100, border: '1px solid rgba(255,255,255,.12)', background: 'rgba(255,255,255,.06)', color: '#f5f5f5', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
          Salvar PDF
        </button>
        <button onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(buildText())}`, '_blank')} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 20px', borderRadius: 100, border: 'none', background: '#25D366', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
          WhatsApp
        </button>
        <button
          onClick={sendEmail}
          disabled={emailStatus === 'sending' || emailStatus === 'sent'}
          style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 20px', borderRadius: 100, border: 'none', background: emailStatus === 'sent' ? '#22c55e' : emailStatus === 'error' ? '#ef4444' : 'linear-gradient(to right,#FF5C00,#FF3D00)', color: '#fff', fontSize: 12, fontWeight: 700, cursor: emailStatus === 'sending' ? 'wait' : 'pointer', fontFamily: 'inherit', opacity: emailStatus === 'sending' ? 0.7 : 1 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          {emailStatus === 'sending' ? 'Enviando…' : emailStatus === 'sent' ? 'Enviado ✓' : emailStatus === 'error' ? 'Erro — tente novamente' : 'Enviar OS por E-mail'}
        </button>
      </div>
    </div>
  );
}
