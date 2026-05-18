import {
  Body, Container, Head, Hr, Html,
  Img, Preview, Row, Column, Section, Text,
} from '@react-email/components';

const DIAS = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

interface Horario { abre: string; fecha: string; fechado: boolean; }
interface Fotos { logo: boolean; local: boolean; produtos: boolean; equipe: boolean; nenhuma: boolean; }
interface Pagamentos { dinheiro: boolean; debito: boolean; credito: boolean; pix: boolean; vale: boolean; }
interface Atributos { agendamento: boolean; online: boolean; wifi: boolean; acessivel: boolean; }

interface Props {
  osNum?: string;
  date?: string;
  nomeFantasia?: string;
  responsavel?: string;
  tipoServico?: string;
  emailGoogle?: string;
  acessoPerfil?: string;
  nomeGoogle?: string;
  categoriaPrincipal?: string;
  categoriasAdicionais?: string[];
  descricao?: string;
  anoFundacao?: string;
  site?: string;
  tipoAtendimento?: string;
  areaAtendimento?: string;
  horarios?: Horario[];
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
  servicos?: string[];
  fotos?: Fotos;
  pagamentos?: Pagamentos;
  atributos?: Atributos;
  obs?: string;
}

const ACESSO_LABEL: Record<string, string> = {
  tem: 'Tem acesso ao perfil',
  nao_tem: 'Não tem acesso',
  criar: 'Criar conta nova',
};
const ATEND_LABEL: Record<string, string> = {
  local: 'Atende no local (endereço fixo)',
  delivery: 'Vai até o cliente',
  ambos: 'Ambos (local + delivery)',
};

export default function FichaTecnica({
  osNum = '260518-1026',
  date = '18/05/2026',
  nomeFantasia = 'Padaria Central',
  responsavel = 'João Silva',
  tipoServico = 'novo',
  emailGoogle = 'joao@gmail.com',
  acessoPerfil = 'nao_tem',
  nomeGoogle = 'Padaria Central',
  categoriaPrincipal = 'Padaria',
  categoriasAdicionais = ['Café', 'Confeitaria'],
  descricao = 'Padaria artesanal fundada em 2010.',
  anoFundacao = '2010',
  site = '',
  tipoAtendimento = 'local',
  areaAtendimento = '',
  horarios = DIAS.map((_, i) => ({ abre: '08:00', fecha: i >= 5 ? '13:00' : '18:00', fechado: i === 6 })),
  whatsapp = '(11) 9 0000-0000',
  instagram = '@padariacentral',
  facebook = '',
  servicos = ['Pão francês', 'Bolo de chocolate'],
  fotos = { logo: true, local: false, produtos: true, equipe: false, nenhuma: false },
  pagamentos = { dinheiro: true, debito: true, credito: false, pix: true, vale: false },
  atributos = { agendamento: false, online: false, wifi: false, acessivel: true },
  obs = '',
}: Props) {
  const empresa = nomeFantasia || responsavel || 'Cliente';
  const tipoLabel = tipoServico === 'novo' ? 'Criar novo perfil' : 'Atualizar perfil existente';

  const fotosAtivas = fotos ? Object.entries(fotos).filter(([, v]) => v).map(([k]) => ({
    logo: 'Logotipo', local: 'Fachada / local', produtos: 'Produtos / serviços',
    equipe: 'Equipe', nenhuma: 'Nenhuma (fotografar no local)',
  }[k] ?? k)).join(', ') : '—';

  const pagamentosAtivos = pagamentos ? Object.entries(pagamentos).filter(([, v]) => v).map(([k]) => ({
    dinheiro: 'Dinheiro', debito: 'Débito', credito: 'Crédito', pix: 'Pix', vale: 'Vale refeição',
  }[k] ?? k)).join(', ') : '—';

  const atributosAtivos = atributos ? Object.entries(atributos).filter(([, v]) => v).map(([k]) => ({
    agendamento: 'Aceita agendamento', online: 'Atendimento online', wifi: 'Wi-Fi', acessivel: 'Acessível cadeirantes',
  }[k] ?? k)).join(', ') : '—';

  return (
    <Html>
      <Head />
      <Preview>📋 Ficha Técnica OS #{osNum} — {empresa}</Preview>
      <Body style={body}>
        <Container style={outer}>

          {/* Header */}
          <Section style={header}>
            <Row>
              <Column>
                <Img src="https://saltoup.com/logo.svg" alt="Salto" width="110" height="34" style={{ display: 'block', marginBottom: 4 }} />
                <Text style={logoSub}>Ficha Técnica · Google Meu Negócio</Text>
              </Column>
              <Column style={{ textAlign: 'right' }}>
                <Text style={osLabel}>OS #{osNum}</Text>
                <Text style={osDate}>{date}</Text>
              </Column>
            </Row>
          </Section>

          <Container style={card}>
            <Section style={{ padding: '28px 32px 0' }}>
              <Text style={badge}>📋 FICHA TÉCNICA RECEBIDA</Text>
              <Text style={heading}>{empresa}</Text>
              <Text style={subLabel}>
                {tipoLabel}
              </Text>
              <Hr style={divider} />
            </Section>

            {/* Acesso */}
            <Section style={{ padding: '0 32px' }}>
              <Text style={sectionLabel}>Acesso ao Google</Text>
              <Container style={dataCard}>
                <InfoRow label="E-mail Google" value={emailGoogle || '—'} />
                <InfoRow label="Situação" value={ACESSO_LABEL[acessoPerfil ?? ''] ?? acessoPerfil ?? '—'} />
              </Container>
            </Section>

            {/* Dados do negócio */}
            <Section style={{ padding: '0 32px' }}>
              <Text style={sectionLabel}>Dados do negócio</Text>
              <Container style={dataCard}>
                <InfoRow label="Nome no Google" value={nomeGoogle || '—'} />
                <InfoRow label="Categoria principal" value={categoriaPrincipal || '—'} />
                {categoriasAdicionais && categoriasAdicionais.length > 0 && (
                  <InfoRow label="Categorias adicionais" value={categoriasAdicionais.filter(Boolean).join(', ')} />
                )}
                {anoFundacao && <InfoRow label="Fundado em" value={anoFundacao} />}
                {site && <InfoRow label="Site" value={site} />}
              </Container>
              {descricao && (
                <Container style={{ ...dataCard, marginTop: 8 }}>
                  <Text style={dataLabelText}>DESCRIÇÃO</Text>
                  <Text style={descText}>{descricao}</Text>
                </Container>
              )}
            </Section>

            {/* Atendimento */}
            <Section style={{ padding: '0 32px' }}>
              <Text style={sectionLabel}>Atendimento</Text>
              <Container style={dataCard}>
                <InfoRow label="Tipo" value={ATEND_LABEL[tipoAtendimento ?? ''] ?? tipoAtendimento ?? '—'} />
                {areaAtendimento && <InfoRow label="Área atendida" value={areaAtendimento} />}
              </Container>
            </Section>

            {/* Horários */}
            <Section style={{ padding: '0 32px' }}>
              <Text style={sectionLabel}>Horários</Text>
              <Container style={dataCard}>
                {(horarios ?? []).map((h, i) => (
                  <Row key={i} style={{ borderBottom: '1px solid #1e1e1e', padding: '6px 0' }}>
                    <Column style={{ width: 72 }}>
                      <Text style={{ ...dataLabelText, margin: 0 }}>{DIAS[i]}</Text>
                    </Column>
                    <Column>
                      <Text style={{ fontSize: 12, color: h.fechado ? '#444' : '#f5f5f5', margin: 0, fontWeight: h.fechado ? 400 : 600 }}>
                        {h.fechado ? 'Fechado' : `${h.abre} — ${h.fecha}`}
                      </Text>
                    </Column>
                  </Row>
                ))}
              </Container>
            </Section>

            {/* Redes Sociais */}
            <Section style={{ padding: '0 32px' }}>
              <Text style={sectionLabel}>Contato & Redes Sociais</Text>
              <Container style={dataCard}>
                {whatsapp && <InfoRow label="WhatsApp" value={whatsapp} />}
                {instagram && <InfoRow label="Instagram" value={instagram} />}
                {facebook && <InfoRow label="Facebook" value={facebook} />}
              </Container>
            </Section>

            {/* Serviços */}
            {servicos && servicos.length > 0 && (
              <Section style={{ padding: '0 32px' }}>
                <Text style={sectionLabel}>Serviços / produtos</Text>
                <Container style={dataCard}>
                  {servicos.filter(Boolean).map((s, i) => (
                    <Row key={i} style={{ borderBottom: '1px solid #1e1e1e', padding: '7px 0' }}>
                      <Column style={{ width: 20 }}>
                        <Text style={{ fontSize: 10, color: '#FF5C00', margin: 0, fontWeight: 700 }}>{i + 1}.</Text>
                      </Column>
                      <Column>
                        <Text style={{ fontSize: 13, color: '#f5f5f5', margin: 0 }}>{s}</Text>
                      </Column>
                    </Row>
                  ))}
                </Container>
              </Section>
            )}

            {/* Fotos, Pagamentos, Atributos */}
            <Section style={{ padding: '0 32px' }}>
              <Text style={sectionLabel}>Recursos & Atributos</Text>
              <Container style={dataCard}>
                <InfoRow label="Fotos disponíveis" value={fotosAtivas || '—'} />
                <InfoRow label="Pagamentos" value={pagamentosAtivos || '—'} />
                {atributosAtivos && atributosAtivos !== '' && (
                  <InfoRow label="Atributos" value={atributosAtivos} />
                )}
              </Container>
            </Section>

            {/* Obs */}
            {obs && (
              <Section style={{ padding: '0 32px 28px' }}>
                <Hr style={divider} />
                <Text style={sectionLabel}>Observações</Text>
                <Text style={descText}>{obs}</Text>
              </Section>
            )}

            <Section style={{ padding: '0 32px 32px' }}>
              <Hr style={divider} />
              <Text style={footNote}>
                Ficha vinculada à OS #{osNum} · {nomeFantasia} · {date}
              </Text>
            </Section>
          </Container>

          <Text style={footer}>
            Gerado automaticamente · Salto · saltoup.com
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <Row style={{ borderBottom: '1px solid #1e1e1e', padding: '8px 0' }}>
      <Column style={{ width: 130 }}><Text style={dataLabelText}>{label.toUpperCase()}</Text></Column>
      <Column><Text style={dataValue}>{value}</Text></Column>
    </Row>
  );
}

// ── Styles ────────────────────────────────────────────────

const body: React.CSSProperties = {
  backgroundColor: '#080808',
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  margin: 0, padding: '40px 16px',
};
const outer: React.CSSProperties = { maxWidth: 580, margin: '0 auto' };

const header: React.CSSProperties = {
  background: 'linear-gradient(135deg, #1a0800 0%, #0e0e0e 100%)',
  borderRadius: '16px 16px 0 0',
  border: '1px solid #252525', borderBottom: 'none',
  padding: '28px 32px',
};
const logoSub: React.CSSProperties = {
  fontSize: 10, color: '#555', letterSpacing: 2,
  textTransform: 'uppercase' as const, margin: 0,
};
const osLabel: React.CSSProperties = { fontSize: 14, fontWeight: 900, color: '#FF5C00', margin: '0 0 2px' };
const osDate: React.CSSProperties = { fontSize: 11, color: '#555', margin: 0 };

const card: React.CSSProperties = {
  backgroundColor: '#0e0e0e',
  border: '1px solid #252525', borderTop: 'none',
  borderRadius: '0 0 16px 16px',
};
const badge: React.CSSProperties = {
  fontSize: 10, fontWeight: 700, letterSpacing: 2,
  color: '#FF5C00', margin: '0 0 10px', textTransform: 'uppercase' as const,
};
const heading: React.CSSProperties = {
  fontSize: 26, fontWeight: 900, color: '#f5f5f5',
  margin: '0 0 4px', letterSpacing: -0.5,
};
const subLabel: React.CSSProperties = {
  fontSize: 12, color: '#555', margin: '0 0 4px',
};
const divider: React.CSSProperties = { borderColor: '#1e1e1e', margin: '20px 0' };
const sectionLabel: React.CSSProperties = {
  fontSize: 9, fontWeight: 700, letterSpacing: 3,
  color: '#FF5C00', textTransform: 'uppercase' as const, margin: '20px 0 10px',
};
const dataCard: React.CSSProperties = {
  backgroundColor: '#141414', borderRadius: 10,
  border: '1px solid #1e1e1e', padding: '4px 16px', marginBottom: 8,
};
const dataLabelText: React.CSSProperties = {
  fontSize: 9, fontWeight: 700, letterSpacing: 2,
  color: '#444', textTransform: 'uppercase' as const, margin: 0,
};
const dataValue: React.CSSProperties = { fontSize: 13, fontWeight: 600, color: '#f5f5f5', margin: 0 };
const descText: React.CSSProperties = { fontSize: 13, color: '#888', lineHeight: 1.6, margin: 0 };
const footNote: React.CSSProperties = { fontSize: 11, color: '#444', margin: 0 };
const footer: React.CSSProperties = {
  fontSize: 11, color: '#333', textAlign: 'center' as const, margin: '20px 0 0',
};
