'use client';

import { useState } from 'react';

const DIAS = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

interface Horario { abre: string; fecha: string; fechado: boolean; }

interface Props {
  osNum: string;
  date: string;
  nomeFantasia: string;
  responsavel: string;
  telefone: string;
}

export default function FichaTecnica({ osNum, date, nomeFantasia, responsavel, telefone }: Props) {
  // ── Tipo de serviço ───────────────────────────────────
  const [tipoServico, setTipoServico] = useState<'novo' | 'atualizacao'>('novo');

  // ── Acesso ────────────────────────────────────────────
  const [emailGoogle, setEmailGoogle] = useState('');
  const [acessoPerfil, setAcessoPerfil] = useState<'tem' | 'nao_tem' | 'criar'>('nao_tem');

  // ── Dados do negócio ──────────────────────────────────
  const [nomeGoogle, setNomeGoogle] = useState(nomeFantasia);
  const [categoriaPrincipal, setCategoriaPrincipal] = useState('');
  const [categoriasAdicionais, setCategoriasAdicionais] = useState<string[]>([]);
  const [descricao, setDescricao] = useState('');
  const [anoFundacao, setAnoFundacao] = useState('');
  const [site, setSite] = useState('');

  // ── Atendimento ───────────────────────────────────────
  const [tipoAtendimento, setTipoAtendimento] = useState<'local' | 'delivery' | 'ambos'>('local');
  const [areaAtendimento, setAreaAtendimento] = useState('');

  // ── Horários ──────────────────────────────────────────
  const [horarios, setHorarios] = useState<Horario[]>(
    DIAS.map((_, i) => ({ abre: '08:00', fecha: i >= 5 ? '13:00' : '18:00', fechado: i === 6 }))
  );
  const updHorario = (i: number, f: keyof Horario, v: string | boolean) =>
    setHorarios(p => p.map((x, j) => j === i ? { ...x, [f]: v } : x));

  // ── Redes sociais ─────────────────────────────────────
  const [whatsapp, setWhatsapp] = useState(telefone);
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');

  // ── Serviços ──────────────────────────────────────────
  const [servicos, setServicos] = useState<string[]>(['']);

  // ── Checkboxes ────────────────────────────────────────
  const [fotos, setFotos] = useState({ logo: false, local: false, produtos: false, equipe: false, nenhuma: false });
  const [pagamentos, setPagamentos] = useState({ dinheiro: false, debito: false, credito: false, pix: false, vale: false });
  const [atributos, setAtributos] = useState({ agendamento: false, online: false, wifi: false, acessivel: false });

  // ── Obs ───────────────────────────────────────────────
  const [obs, setObs] = useState('');

  // ── Status ────────────────────────────────────────────
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const send = async () => {
    setStatus('sending');
    try {
      const res = await fetch('/api/ficha-tecnica', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          osNum, date, nomeFantasia, responsavel,
          tipoServico, emailGoogle, acessoPerfil,
          nomeGoogle, categoriaPrincipal, categoriasAdicionais,
          descricao, anoFundacao, site,
          tipoAtendimento, areaAtendimento,
          horarios, whatsapp, instagram, facebook,
          servicos: servicos.filter(Boolean),
          fotos, pagamentos, atributos, obs,
        }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  // ── Helpers de estilo ─────────────────────────────────
  const inp: React.CSSProperties = {
    background: 'transparent', border: 'none', borderBottom: '1px solid #e0e0e0',
    outline: 'none', fontSize: 13, color: '#1a1a1a', fontFamily: 'inherit', width: '100%', padding: '3px 0',
  };
  const lbl = (text: string) => (
    <label style={{ fontSize: 9, color: '#bbb', display: 'block', marginBottom: 3, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' as const }}>{text}</label>
  );
  const sec = (text: string) => (
    <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase' as const, color: '#FF5C00', marginBottom: 10, marginTop: 0 }}>{text}</p>
  );
  const pill = (label: string, active: boolean, onClick: () => void) => (
    <button type="button" onClick={onClick} style={{
      padding: '6px 14px', borderRadius: 100,
      border: active ? 'none' : '1px solid #e0e0e0',
      background: active ? '#FF5C00' : 'transparent',
      color: active ? '#fff' : '#888', fontSize: 12, fontWeight: 700,
      cursor: 'pointer', fontFamily: 'inherit', lineHeight: 1.4,
    }}>{label}</button>
  );
  const chk = (label: string, checked: boolean, onChange: (v: boolean) => void) => (
    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', minHeight: 32 }}>
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)}
        style={{ width: 18, height: 18, accentColor: '#FF5C00', cursor: 'pointer', flexShrink: 0 }} />
      <span style={{ fontSize: 12, color: '#555' }}>{label}</span>
    </label>
  );

  const divider: React.CSSProperties = { marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid #f0f0f0' };

  return (
    <div style={{ marginTop: 32, borderTop: '2px dashed #FF5C00', paddingTop: 24 }}>

      {/* Cabeçalho */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#FF5C00', marginBottom: 4 }}>Ficha Técnica</p>
          <p style={{ fontSize: 18, fontWeight: 900, color: '#111', letterSpacing: -0.5, marginBottom: 2 }}>Google Meu Negócio</p>
          <p style={{ fontSize: 12, color: '#999' }}>{nomeFantasia || responsavel}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: 9, color: '#FF5C00', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 2 }}>OS vinculada</p>
          <p style={{ fontSize: 14, fontWeight: 900, color: '#111' }}>#{osNum}</p>
          <p style={{ fontSize: 11, color: '#aaa' }}>{date}</p>
        </div>
      </div>

      {/* TIPO DE SERVIÇO */}
      <div style={divider}>
        {sec('Tipo de serviço')}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {pill('Criar novo perfil', tipoServico === 'novo', () => setTipoServico('novo'))}
          {pill('Atualizar perfil existente', tipoServico === 'atualizacao', () => setTipoServico('atualizacao'))}
        </div>
      </div>

      {/* ACESSO AO GOOGLE */}
      <div style={divider}>
        {sec('Acesso ao Google')}
        <div style={{ marginBottom: 14 }}>
          {lbl('E-mail do Google do cliente')}
          <input style={inp} value={emailGoogle} onChange={e => setEmailGoogle(e.target.value)} placeholder="email@gmail.com" type="email" />
        </div>
        <div>
          {lbl('Situação do perfil')}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 6 }}>
            {pill('Tem acesso', acessoPerfil === 'tem', () => setAcessoPerfil('tem'))}
            {pill('Não tem acesso', acessoPerfil === 'nao_tem', () => setAcessoPerfil('nao_tem'))}
            {pill('Criar conta nova', acessoPerfil === 'criar', () => setAcessoPerfil('criar'))}
          </div>
        </div>
      </div>

      {/* DADOS DO NEGÓCIO */}
      <div style={divider}>
        {sec('Dados do negócio')}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 24px', marginBottom: 14 }}>
          <div>
            {lbl('Nome como deve aparecer no Google')}
            <input style={{ ...inp, fontWeight: 700 }} value={nomeGoogle} onChange={e => setNomeGoogle(e.target.value)} />
          </div>
          <div>
            {lbl('Ano de fundação')}
            <input style={inp} value={anoFundacao} onChange={e => setAnoFundacao(e.target.value)} placeholder="Ex: 2015" />
          </div>
          <div>
            {lbl('Categoria principal')}
            <input style={inp} value={categoriaPrincipal} onChange={e => setCategoriaPrincipal(e.target.value)} placeholder="Ex: Padaria, Restaurante, Salão..." />
          </div>
          <div>
            {lbl('Site')}
            <input style={inp} value={site} onChange={e => setSite(e.target.value)} placeholder="https://" />
          </div>
        </div>

        {/* Categorias adicionais */}
        <div style={{ marginBottom: 14 }}>
          {lbl('Categorias adicionais')}
          {categoriasAdicionais.map((cat, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
              <input style={{ ...inp, flex: 1 }} value={cat}
                onChange={e => setCategoriasAdicionais(p => p.map((c, j) => j === i ? e.target.value : c))}
                placeholder="Ex: Café, Confeitaria, Sorveteria..." />
              <button onClick={() => setCategoriasAdicionais(p => p.filter((_, j) => j !== i))}
                style={{ background: 'none', border: 'none', color: '#ddd', fontSize: 18, cursor: 'pointer', lineHeight: 1, padding: '0 4px' }}>×</button>
            </div>
          ))}
          <button onClick={() => setCategoriasAdicionais(p => [...p, ''])}
            style={{ fontSize: 11, color: '#FF5C00', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit' }}>
            + adicionar categoria
          </button>
        </div>

        {/* Descrição */}
        <div>
          {lbl(`Descrição do negócio (${descricao.length}/750 caracteres)`)}
          <textarea value={descricao} onChange={e => e.target.value.length <= 750 && setDescricao(e.target.value)}
            placeholder="Descreva o negócio, diferenciais, história, especialidades..."
            rows={4} style={{ width: '100%', border: '1px solid #e0e0e0', borderRadius: 6, padding: '8px 10px', fontSize: 12, lineHeight: 1.6, resize: 'vertical', outline: 'none', fontFamily: 'inherit', color: '#1a1a1a', boxSizing: 'border-box' }} />
        </div>
      </div>

      {/* TIPO DE ATENDIMENTO */}
      <div style={divider}>
        {sec('Tipo de atendimento')}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
          {pill('Atende no local', tipoAtendimento === 'local', () => setTipoAtendimento('local'))}
          {pill('Vai até o cliente', tipoAtendimento === 'delivery', () => setTipoAtendimento('delivery'))}
          {pill('Ambos', tipoAtendimento === 'ambos', () => setTipoAtendimento('ambos'))}
        </div>
        {(tipoAtendimento === 'delivery' || tipoAtendimento === 'ambos') && (
          <div>
            {lbl('Bairros / cidades atendidos')}
            <input style={inp} value={areaAtendimento} onChange={e => setAreaAtendimento(e.target.value)}
              placeholder="Ex: Centro, Vila Mariana, Santo André, até 20km..." />
          </div>
        )}
      </div>

      {/* HORÁRIOS */}
      <div style={divider}>
        {sec('Horário de funcionamento')}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {DIAS.map((dia, i) => {
            const h = horarios[i];
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 8, borderBottom: '1px solid #f5f5f5' }}>
                <span style={{ width: 58, fontSize: 12, fontWeight: 600, color: h.fechado ? '#ccc' : '#333', flexShrink: 0 }}>{dia}</span>
                <input type="time" value={h.abre} disabled={h.fechado}
                  onChange={e => updHorario(i, 'abre', e.target.value)}
                  style={{ flex: 1, border: 'none', borderBottom: '1px solid #e0e0e0', outline: 'none', fontSize: 12, fontFamily: 'inherit', background: 'transparent', color: '#1a1a1a', opacity: h.fechado ? 0.25 : 1 }} />
                <span style={{ fontSize: 11, color: '#bbb' }}>às</span>
                <input type="time" value={h.fecha} disabled={h.fechado}
                  onChange={e => updHorario(i, 'fecha', e.target.value)}
                  style={{ flex: 1, border: 'none', borderBottom: '1px solid #e0e0e0', outline: 'none', fontSize: 12, fontFamily: 'inherit', background: 'transparent', color: '#1a1a1a', opacity: h.fechado ? 0.25 : 1 }} />
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', flexShrink: 0 }}>
                  <input type="checkbox" checked={h.fechado} onChange={e => updHorario(i, 'fechado', e.target.checked)}
                    style={{ width: 16, height: 16, accentColor: '#FF5C00', cursor: 'pointer' }} />
                  <span style={{ fontSize: 11, color: '#aaa' }}>Fechado</span>
                </label>
              </div>
            );
          })}
        </div>
      </div>

      {/* REDES SOCIAIS */}
      <div style={divider}>
        {sec('Contato & Redes Sociais')}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px 24px' }}>
          <div>
            {lbl('WhatsApp')}
            <input style={inp} value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="(11) 9 0000-0000" />
          </div>
          <div>
            {lbl('Instagram')}
            <input style={inp} value={instagram} onChange={e => setInstagram(e.target.value)} placeholder="@perfil" />
          </div>
          <div>
            {lbl('Facebook')}
            <input style={inp} value={facebook} onChange={e => setFacebook(e.target.value)} placeholder="facebook.com/pagina" />
          </div>
        </div>
      </div>

      {/* SERVIÇOS */}
      <div style={divider}>
        {sec('Serviços / produtos principais')}
        {servicos.map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 10, alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: '#bbb', minWidth: 18, fontWeight: 700 }}>{i + 1}.</span>
            <input style={{ ...inp, flex: 1 }} value={s}
              onChange={e => setServicos(p => p.map((x, j) => j === i ? e.target.value : x))}
              placeholder="Ex: Pão francês, Corte feminino, Consultoria..." />
            {servicos.length > 1 && (
              <button onClick={() => setServicos(p => p.filter((_, j) => j !== i))}
                style={{ background: 'none', border: 'none', color: '#ddd', fontSize: 18, cursor: 'pointer', lineHeight: 1, padding: '0 4px' }}>×</button>
            )}
          </div>
        ))}
        <button onClick={() => setServicos(p => [...p, ''])}
          style={{ fontSize: 11, color: '#FF5C00', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit' }}>
          + adicionar serviço
        </button>
      </div>

      {/* FOTOS & PAGAMENTOS */}
      <div style={{ ...divider, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
        <div>
          {sec('Fotos disponíveis')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {chk('Logotipo', fotos.logo, v => setFotos(p => ({ ...p, logo: v, nenhuma: false })))}
            {chk('Fachada / local', fotos.local, v => setFotos(p => ({ ...p, local: v, nenhuma: false })))}
            {chk('Produtos / serviços', fotos.produtos, v => setFotos(p => ({ ...p, produtos: v, nenhuma: false })))}
            {chk('Equipe', fotos.equipe, v => setFotos(p => ({ ...p, equipe: v, nenhuma: false })))}
            {chk('Nenhuma (vou fotografar)', fotos.nenhuma, v => setFotos({ logo: false, local: false, produtos: false, equipe: false, nenhuma: v }))}
          </div>
        </div>
        <div>
          {sec('Formas de pagamento')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {chk('Dinheiro', pagamentos.dinheiro, v => setPagamentos(p => ({ ...p, dinheiro: v })))}
            {chk('Débito', pagamentos.debito, v => setPagamentos(p => ({ ...p, debito: v })))}
            {chk('Crédito', pagamentos.credito, v => setPagamentos(p => ({ ...p, credito: v })))}
            {chk('Pix', pagamentos.pix, v => setPagamentos(p => ({ ...p, pix: v })))}
            {chk('Vale refeição', pagamentos.vale, v => setPagamentos(p => ({ ...p, vale: v })))}
          </div>
        </div>
      </div>

      {/* ATRIBUTOS */}
      <div style={divider}>
        {sec('Atributos')}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 32px' }}>
          {chk('Aceita agendamento / reservas', atributos.agendamento, v => setAtributos(p => ({ ...p, agendamento: v })))}
          {chk('Atendimento online disponível', atributos.online, v => setAtributos(p => ({ ...p, online: v })))}
          {chk('Wi-Fi disponível', atributos.wifi, v => setAtributos(p => ({ ...p, wifi: v })))}
          {chk('Acessível para cadeirantes', atributos.acessivel, v => setAtributos(p => ({ ...p, acessivel: v })))}
        </div>
      </div>

      {/* OBSERVAÇÕES */}
      <div style={{ marginBottom: 24 }}>
        {sec('Observações adicionais')}
        <textarea value={obs} onChange={e => setObs(e.target.value)}
          placeholder="Informações extras, pedidos especiais, contexto importante..."
          rows={3} style={{ width: '100%', border: '1px solid #e0e0e0', borderRadius: 6, padding: '8px 10px', fontSize: 12, lineHeight: 1.6, resize: 'vertical', outline: 'none', fontFamily: 'inherit', color: '#1a1a1a', boxSizing: 'border-box' }} />
      </div>

      {/* ENVIAR */}
      {status !== 'sent' ? (
        <button onClick={send} disabled={status === 'sending'} style={{
          width: '100%', padding: 14, borderRadius: 10, border: 'none',
          background: status === 'error' ? '#ef4444' : 'linear-gradient(to right, #FF5C00, #FF3D00)',
          color: '#fff', fontSize: 14, fontWeight: 700, cursor: status === 'sending' ? 'wait' : 'pointer',
          fontFamily: 'inherit', opacity: status === 'sending' ? 0.7 : 1,
        }}>
          {status === 'sending' ? 'Enviando ficha...' : status === 'error' ? 'Erro — tente novamente' : 'Enviar Ficha Técnica →'}
        </button>
      ) : (
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: '#22c55e', marginBottom: 4 }}>✓ Ficha enviada</p>
          <p style={{ fontSize: 12, color: '#aaa' }}>Enviada para bruno@saltoup.com vinculada à OS #{osNum}</p>
        </div>
      )}
    </div>
  );
}
