'use client';

import { useState } from 'react';
import SignaturePad from './SignaturePad';

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
  // Contato
  const [responsavel, setResponsavel] = useState('');
  const [telefone, setTelefone] = useState('');
  const [emailVal, setEmailVal] = useState('');

  const [items, setItems] = useState<ServiceItem[]>(DEFAULT_SERVICES);
  const [obs, setObs] = useState('');

  const upd = (id: number, f: keyof ServiceItem, v: string) =>
    setItems(p => p.map(it => it.id === id ? { ...it, [f]: v } : it));
  const addItem = () => setItems(p => [...p, { id: Date.now(), description: '', qty: '1', price: '' }]);
  const rmItem = (id: number) => setItems(p => p.filter(it => it.id !== id));
  const total = calcTotal(items);

  const buildText = () => [
    `*ORDEM DE SERVIÇO — Salto*`,
    `OS #${osNum} · ${date}`,
    ``,
    nomeFantasia ? `*Nome Fantasia:* ${nomeFantasia}` : '',
    razaoSocial  ? `*Razão Social:* ${razaoSocial}`   : '',
    cnpj         ? `*CNPJ:* ${cnpj}`                   : '',
    endereco     ? `*Endereço:* ${endereco}`             : '',
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
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '28px 32px', gap: 16 }}>

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
            <div>
              {lbl('Endereço')}
              <input style={inp} value={endereco} onChange={e => setEndereco(e.target.value)} placeholder="Rua, número, cidade - UF" />
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
          <SignaturePad label={responsavel || nomeFantasia || 'Assinatura do cliente'} height={64} />
          <SignaturePad label="Bruno Vieira — Salto" height={64} />
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
        <button onClick={() => window.open(`mailto:${emailVal}?subject=${encodeURIComponent(`Ordem de Serviço #${osNum} — Salto`)}&body=${encodeURIComponent(buildText().replace(/\*/g, '').replace(/_/g, ''))}`, '_blank')} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '10px 20px', borderRadius: 100, border: 'none', background: 'linear-gradient(to right,#FF5C00,#FF3D00)', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          E-mail
        </button>
      </div>
    </div>
  );
}
