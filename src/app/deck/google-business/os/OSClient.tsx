'use client';

import { useState, useEffect } from 'react';
import SignaturePad from '../SignaturePad';

interface ServiceItem {
  id: number;
  description: string;
  details: string;
  qty: string;
  price: string;
}

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 1,
    description: 'Configuração do Perfil da Empresa no Google',
    details: 'Preenchimento completo de todas as informações · Upload de fotos do negócio · Configuração de horários, categorias e serviços · Linkagem com WhatsApp e site',
    qty: '1',
    price: '',
  },
  {
    id: 2,
    description: 'Estratégia de avaliações',
    details: 'Definição do processo para solicitar avaliações aos clientes certos · Script de abordagem · Orientação sobre como responder avaliações',
    qty: '1',
    price: '',
  },
  {
    id: 3,
    description: 'Acompanhamento mensal',
    details: 'Monitoramento dos relatórios do Google · Publicação de novidades e ofertas · Resposta a avaliações · Relatório mensal de desempenho',
    qty: '1 mês',
    price: '',
  },
];

function today() {
  return new Date().toLocaleDateString('pt-BR');
}

function osNumber() {
  const d = new Date();
  return String(d.getFullYear()).slice(2) +
    String(d.getMonth() + 1).padStart(2, '0') +
    String(d.getDate()).padStart(2, '0') +
    '-' + String(d.getHours()).padStart(2, '0') +
    String(d.getMinutes()).padStart(2, '0');
}

function formatBRL(value: string) {
  const n = parseFloat(value.replace(',', '.'));
  if (isNaN(n)) return '';
  return n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function calcTotal(items: ServiceItem[]) {
  const sum = items.reduce((acc, item) => {
    const n = parseFloat(item.price.replace(',', '.'));
    return acc + (isNaN(n) ? 0 : n);
  }, 0);
  return sum > 0 ? formatBRL(String(sum)) : '';
}

export default function OSClient() {
  const [osNum] = useState(osNumber);
  const [date] = useState(today);
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [razaoSocial, setRazaoSocial] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [endereco, setEndereco] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [items, setItems] = useState<ServiceItem[]>(DEFAULT_SERVICES);
  const [obs, setObs] = useState('');

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    html.style.overflowY = 'auto';
    body.style.overflowY = 'auto';
    return () => {
      html.style.overflowY = '';
      body.style.overflowY = '';
    };
  }, []);

  const updateItem = (id: number, field: keyof ServiceItem, value: string) => {
    setItems(prev => prev.map(it => it.id === id ? { ...it, [field]: value } : it));
  };

  const addItem = () => {
    setItems(prev => [...prev, { id: Date.now(), description: '', details: '', qty: '1', price: '' }]);
  };

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(it => it.id !== id));
  };

  const total = calcTotal(items);

  const buildText = () => {
    const lines = [
      `*ORDEM DE SERVIÇO — Salto*`,
      `OS #${osNum} · ${date}`,
      ``,
      nomeFantasia ? `*Nome Fantasia:* ${nomeFantasia}` : '',
      razaoSocial ? `*Razão Social:* ${razaoSocial}` : '',
      cnpj ? `*CNPJ:* ${cnpj}` : '',
      endereco ? `*Endereço:* ${endereco}` : '',
      ``,
      responsavel ? `*Responsável:* ${responsavel}` : '',
      telefone ? `*Telefone:* ${telefone}` : '',
      email ? `*E-mail:* ${email}` : '',
      ``,
      `*SERVIÇOS:*`,
      ...items
        .filter(it => it.description)
        .map((it, i) => `${i + 1}. ${it.description}${it.price ? ` — R$ ${formatBRL(it.price)}` : ''}`),
      ``,
      total ? `*TOTAL: R$ ${total}*` : '',
      ``,
      obs ? `_${obs}_` : '',
      ``,
      `Gerado por Salto · saltoup.com`,
    ].filter(l => l !== null && l !== undefined);
    return lines.join('\n');
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(buildText());
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Ordem de Serviço #${osNum} — Salto`);
    const body = encodeURIComponent(buildText().replace(/\*/g, '').replace(/_/g, ''));
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');
  };

  const handlePrint = () => window.print();

  const inp: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid #ddd',
    outline: 'none',
    fontSize: 14,
    color: '#1a1a1a',
    fontFamily: 'inherit',
    width: '100%',
    padding: '3px 0',
  };

  const inpSm: React.CSSProperties = { ...inp, fontSize: 13 };

  return (
    <>
      {/* Print CSS */}
      <style>{`
        @media print {
          body { background: white !important; }
          .no-print { display: none !important; }
          .noise { display: none !important; }
          #bar { display: none !important; }
          .os-page { padding: 0 !important; background: white !important; }
          .os-card { box-shadow: none !important; border: none !important; max-width: 100% !important; }
          input, textarea { border-bottom: 1px solid #ccc !important; }
        }
        input::placeholder, textarea::placeholder { color: #bbb; }
        textarea { resize: vertical; }
        .add-row-btn:hover { background: rgba(255,92,0,0.08) !important; }
        .remove-btn:hover { color: #ff5050 !important; }
        .action-btn:hover { opacity: 0.85; }
      `}</style>

      <div
        className="os-page"
        style={{
          minHeight: '100vh',
          background: '#0e0e0e',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '48px 24px 80px',
          fontFamily: 'var(--font-deck, Montserrat, sans-serif)',
        }}
      >
        {/* Header fora do card */}
        <div className="no-print" style={{ width: '100%', maxWidth: 760, marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Salto" style={{ height: 22, opacity: 0.7 }} />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#555' }}>
            Ordem de Serviço
          </span>
        </div>

        {/* Document card */}
        <div
          className="os-card"
          style={{
            width: '100%',
            maxWidth: 760,
            background: '#fff',
            borderRadius: 16,
            padding: '40px 48px',
            color: '#1a1a1a',
            boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
          }}
        >
          {/* Doc header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32, paddingBottom: 24, borderBottom: '2px solid #111' }}>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="Salto" style={{ height: 28, marginBottom: 6, filter: 'invert(1)' }} />
              <p style={{ fontSize: 11, color: '#888', marginTop: 4 }}>saltoup.com · contato@saltoup.com</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#888', marginBottom: 4 }}>Ordem de Serviço</p>
              <p style={{ fontSize: 22, fontWeight: 900, color: '#111', letterSpacing: -0.5 }}>#{osNum}</p>
              <p style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{date}</p>
            </div>
          </div>

          {/* Dados da Empresa */}
          <div style={{ marginBottom: 28 }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#FF5C00', marginBottom: 16 }}>Dados da Empresa</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 32px' }}>
              <div>
                <label style={{ fontSize: 10, color: '#aaa', display: 'block', marginBottom: 4 }}>NOME FANTASIA</label>
                <input style={{ ...inp, fontWeight: 700 }} value={nomeFantasia} onChange={e => setNomeFantasia(e.target.value)} placeholder="Como é conhecido" />
              </div>
              <div>
                <label style={{ fontSize: 10, color: '#aaa', display: 'block', marginBottom: 4 }}>RAZÃO SOCIAL</label>
                <input style={inp} value={razaoSocial} onChange={e => setRazaoSocial(e.target.value)} placeholder="Razão social completa" />
              </div>
              <div>
                <label style={{ fontSize: 10, color: '#aaa', display: 'block', marginBottom: 4 }}>CNPJ</label>
                <input style={inp} value={cnpj} onChange={e => setCnpj(e.target.value)} placeholder="00.000.000/0001-00" />
              </div>
              <div>
                <label style={{ fontSize: 10, color: '#aaa', display: 'block', marginBottom: 4 }}>ENDEREÇO</label>
                <input style={inp} value={endereco} onChange={e => setEndereco(e.target.value)} placeholder="Rua, número, cidade — UF" />
              </div>
            </div>
          </div>

          {/* Contato / Responsável */}
          <div style={{ marginBottom: 32, paddingTop: 20, borderTop: '1px solid #f0f0f0' }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#FF5C00', marginBottom: 16 }}>Contato / Responsável</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px 24px' }}>
              <div>
                <label style={{ fontSize: 10, color: '#aaa', display: 'block', marginBottom: 4 }}>NOME</label>
                <input style={inp} value={responsavel} onChange={e => setResponsavel(e.target.value)} placeholder="Nome do responsável" />
              </div>
              <div>
                <label style={{ fontSize: 10, color: '#aaa', display: 'block', marginBottom: 4 }}>TELEFONE / WHATSAPP</label>
                <input style={inp} value={telefone} onChange={e => setTelefone(e.target.value)} placeholder="(11) 9 0000-0000" />
              </div>
              <div>
                <label style={{ fontSize: 10, color: '#aaa', display: 'block', marginBottom: 4 }}>E-MAIL</label>
                <input style={inp} value={email} onChange={e => setEmail(e.target.value)} placeholder="email@empresa.com" type="email" />
              </div>
            </div>
          </div>

          {/* Services table */}
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#FF5C00', marginBottom: 12 }}>Serviços</p>

            {/* Table header */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 110px 32px', gap: '0 12px', padding: '8px 0', borderBottom: '1px solid #eee', marginBottom: 4 }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: '#aaa', letterSpacing: 2, textTransform: 'uppercase' }}>Descrição</p>
              <p style={{ fontSize: 10, fontWeight: 700, color: '#aaa', letterSpacing: 2, textTransform: 'uppercase', textAlign: 'center' }}>Qtd</p>
              <p style={{ fontSize: 10, fontWeight: 700, color: '#aaa', letterSpacing: 2, textTransform: 'uppercase', textAlign: 'right' }}>Valor (R$)</p>
              <span />
            </div>

            {/* Items */}
            {items.map(item => (
              <div
                key={item.id}
                style={{ display: 'grid', gridTemplateColumns: '1fr 80px 110px 32px', gap: '0 12px', padding: '12px 0', borderBottom: '1px solid #f0f0f0', alignItems: 'start' }}
              >
                <div>
                  <input
                    style={{ ...inp, fontWeight: 700, marginBottom: 6 }}
                    value={item.description}
                    onChange={e => updateItem(item.id, 'description', e.target.value)}
                    placeholder="Descrição do serviço"
                  />
                  <input
                    style={{ ...inpSm, color: '#666', borderBottom: 'none' }}
                    value={item.details}
                    onChange={e => updateItem(item.id, 'details', e.target.value)}
                    placeholder="Detalhes (opcional)"
                  />
                </div>
                <input
                  style={{ ...inp, textAlign: 'center' }}
                  value={item.qty}
                  onChange={e => updateItem(item.id, 'qty', e.target.value)}
                  placeholder="1"
                />
                <input
                  style={{ ...inp, textAlign: 'right', fontWeight: 700 }}
                  value={item.price}
                  onChange={e => updateItem(item.id, 'price', e.target.value)}
                  placeholder="0,00"
                />
                <button
                  className="remove-btn no-print"
                  onClick={() => removeItem(item.id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ccc', fontSize: 18, lineHeight: 1, paddingTop: 4, transition: 'color .15s' }}
                >×</button>
              </div>
            ))}

            {/* Add row */}
            <button
              className="add-row-btn no-print"
              onClick={addItem}
              style={{ marginTop: 10, padding: '8px 16px', borderRadius: 8, border: '1px dashed #ddd', background: 'transparent', color: '#aaa', fontSize: 12, cursor: 'pointer', transition: 'background .15s' }}
            >
              + Adicionar item
            </button>

            {/* Total */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16, paddingTop: 16, borderTop: '2px solid #111' }}>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#aaa', marginBottom: 4 }}>Total</p>
                <p style={{ fontSize: 26, fontWeight: 900, color: total ? '#FF5C00' : '#ccc' }}>
                  {total ? `R$ ${total}` : 'R$ —'}
                </p>
              </div>
            </div>
          </div>

          {/* Observations */}
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#FF5C00', marginBottom: 10 }}>Observações</p>
            <textarea
              style={{ ...inp, borderBottom: '1px solid #ddd', padding: '8px 0', lineHeight: 1.7, minHeight: 60, display: 'block' }}
              value={obs}
              onChange={e => setObs(e.target.value)}
              placeholder="Condições de pagamento, prazo, etc."
            />
          </div>

          {/* Signature */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, paddingTop: 32, borderTop: '1px solid #eee' }}>
            <SignaturePad label={responsavel || nomeFantasia || 'Assinatura do cliente'} height={80} />
            <SignaturePad label="Bruno Vieira — Salto" height={80} />
          </div>
        </div>

        {/* Action buttons */}
        <div className="no-print" style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            className="action-btn"
            onClick={handlePrint}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 100, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.06)', color: '#f5f5f5', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', transition: 'opacity .2s', letterSpacing: 0.5 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
            Salvar PDF / Imprimir
          </button>

          <button
            className="action-btn"
            onClick={handleWhatsApp}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 100, border: 'none', background: '#25D366', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', transition: 'opacity .2s', letterSpacing: 0.5 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
            Enviar por WhatsApp
          </button>

          <button
            className="action-btn"
            onClick={handleEmail}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 100, border: 'none', background: 'linear-gradient(to right, #FF5C00, #FF3D00)', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', transition: 'opacity .2s', letterSpacing: 0.5 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Enviar por E-mail
          </button>
        </div>
      </div>
    </>
  );
}
