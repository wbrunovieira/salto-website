import {
  Body, Column, Container, Head, Hr, Html,
  Img, Link, Preview, Row, Section, Text,
} from '@react-email/components';

interface OSItem { description: string; qty: string; price: string }

interface Props {
  osNum?: string;
  date?: string;
  nomeFantasia?: string;
  razaoSocial?: string;
  cnpj?: string;
  endereco?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  responsavel?: string;
  telefone?: string;
  email?: string;
  items?: OSItem[];
  obs?: string;
  total?: string;
}

export default function OrdemServicoInterno({
  osNum = '250518-1400',
  date = '18/05/2025',
  nomeFantasia = 'Padaria Central',
  razaoSocial = '',
  cnpj = '',
  endereco = '',
  bairro = '',
  cidade = '',
  estado = '',
  cep = '',
  responsavel = 'João Silva',
  telefone = '(11) 99999-0000',
  email = 'joao@empresa.com',
  items = [
    { description: 'Configuração do Perfil da Empresa no Google', qty: '1', price: '350' },
    { description: 'Estratégia de avaliações', qty: '1', price: '' },
  ],
  obs = '',
  total = '350,00',
}: Props) {
  const empresa = nomeFantasia || responsavel || 'Novo cliente';
  const waLink = telefone ? `https://wa.me/${telefone.replace(/\D/g, '')}` : '';

  return (
    <Html>
      <Head />
      <Preview>🧾 Nova OS #{osNum} — {empresa}</Preview>
      <Body style={body}>
        <Container style={outer}>

          {/* Single bordered wrapper — avoids split-border rendering in email clients */}
          <Container style={wrapper}>

            {/* Header */}
            <Section style={header}>
              <Row>
                <Column>
                  <Img src="https://saltoup.com/logo.svg" alt="Salto" width="120" height="37" style={{ display: 'block', marginBottom: 4 }} />
                  <Text style={logoSub}>Nova Ordem de Serviço</Text>
                </Column>
                <Column style={{ textAlign: 'right' }}>
                  <Text style={osLabel}>OS #{osNum}</Text>
                  <Text style={osDate}>{date}</Text>
                </Column>
              </Row>
            </Section>

            <Hr style={headerDivider} />
            <Section style={{ padding: '28px 32px 0' }}>
              <Text style={badge}>● NOVA OS GERADA</Text>
              <Text style={heading}>
                {empresa}
              </Text>
              <Hr style={divider} />
            </Section>

            {/* Client data */}
            <Section style={{ padding: '0 32px' }}>
              <Text style={sectionLabel}>Dados do cliente</Text>
              <Container style={dataCard}>
                {nomeFantasia && <DataRow label="Nome Fantasia" value={nomeFantasia} />}
                {razaoSocial && <DataRow label="Razão Social" value={razaoSocial} />}
                {cnpj && <DataRow label="CNPJ" value={cnpj} />}
                {endereco && <DataRow label="Endereço" value={endereco} />}
                {bairro && <DataRow label="Bairro" value={bairro} />}
                {(cidade || estado) && <DataRow label="Cidade / Estado" value={[cidade, estado].filter(Boolean).join(' — ')} />}
                {cep && <DataRow label="CEP" value={cep} />}
                {responsavel && <DataRow label="Responsável" value={responsavel} />}
                {telefone && (
                  <Row style={dataRow}>
                    <Column style={dataLabelStyle}><Text style={dataLabelText}>TELEFONE</Text></Column>
                    <Column>
                      {waLink
                        ? <Link href={waLink} style={dataLink}>{telefone}</Link>
                        : <Text style={dataValue}>{telefone}</Text>
                      }
                    </Column>
                  </Row>
                )}
                {email && (
                  <Row style={dataRow}>
                    <Column style={dataLabelStyle}><Text style={dataLabelText}>E-MAIL</Text></Column>
                    <Column>
                      <Link href={`mailto:${email}`} style={dataLink}>{email}</Link>
                    </Column>
                  </Row>
                )}
              </Container>
            </Section>

            {/* Services */}
            <Section style={{ padding: '0 32px' }}>
              <Text style={sectionLabel}>Serviços</Text>
              {items.filter(i => i.description).map((item, n) => (
                <Row key={n} style={serviceRow}>
                  <Column style={{ width: '60%' }}>
                    <Text style={serviceDesc}>{n + 1}. {item.description}</Text>
                  </Column>
                  <Column style={{ width: '20%', textAlign: 'center' }}>
                    <Text style={serviceQty}>{item.qty}</Text>
                  </Column>
                  <Column style={{ width: '20%', textAlign: 'right' }}>
                    <Text style={servicePrice}>{item.price ? `R$ ${item.price}` : '—'}</Text>
                  </Column>
                </Row>
              ))}
              {total && (
                <Row style={{ marginTop: 12, paddingTop: 12, borderTop: '2px solid #252525' }}>
                  <Column><Text style={totalLabel}>TOTAL</Text></Column>
                  <Column style={{ textAlign: 'right' }}>
                    <Text style={totalValue}>R$ {total}</Text>
                  </Column>
                </Row>
              )}
            </Section>

            {obs && (
              <Section style={{ padding: '0 32px' }}>
                <Hr style={divider} />
                <Text style={sectionLabel}>Observações</Text>
                <Text style={obsText}>{obs}</Text>
              </Section>
            )}

            {/* CTA */}
            {waLink && (
              <Section style={{ padding: '24px 32px 32px' }}>
                <Hr style={divider} />
                <Link href={waLink} style={ctaBtn}>
                  WhatsApp do cliente →
                </Link>
                {email && (
                  <Link href={`mailto:${email}`} style={ctaBtnSecondary}>
                    Enviar e-mail
                  </Link>
                )}
              </Section>
            )}
          </Container>

          <Text style={footer}>
            Gerado automaticamente · Salto · saltoup.com
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <Row style={dataRow}>
      <Column style={dataLabelStyle}><Text style={dataLabelText}>{label.toUpperCase()}</Text></Column>
      <Column><Text style={dataValue}>{value}</Text></Column>
    </Row>
  );
}

// ─── Styles ───────────────────────────────────────────────

const body: React.CSSProperties = {
  backgroundColor: '#080808',
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  margin: 0, padding: '40px 16px',
};
const outer: React.CSSProperties = { maxWidth: 580, margin: '0 auto' };

const wrapper: React.CSSProperties = {
  border: '1px solid #252525',
  borderRadius: 16,
  overflow: 'hidden',
  backgroundColor: '#0e0e0e',
};

const header: React.CSSProperties = {
  background: 'linear-gradient(135deg, #1a0800 0%, #0e0e0e 100%)',
  padding: '28px 32px',
};

const headerDivider: React.CSSProperties = {
  borderColor: '#252525',
  margin: 0,
};

const logoSub: React.CSSProperties = {
  fontSize: 10, color: '#555', letterSpacing: 2,
  textTransform: 'uppercase' as const, margin: 0,
};
const osLabel: React.CSSProperties = {
  fontSize: 14, fontWeight: 900, color: '#FF5C00', margin: '0 0 2px',
};
const osDate: React.CSSProperties = { fontSize: 11, color: '#555', margin: 0 };


const badge: React.CSSProperties = {
  fontSize: 10, fontWeight: 700, letterSpacing: 2,
  color: '#FF5C00', margin: '0 0 10px',
  textTransform: 'uppercase' as const,
};
const heading: React.CSSProperties = {
  fontSize: 26, fontWeight: 900, color: '#f5f5f5',
  margin: '0 0 4px', letterSpacing: -0.5,
};
const divider: React.CSSProperties = { borderColor: '#1e1e1e', margin: '20px 0' };
const sectionLabel: React.CSSProperties = {
  fontSize: 9, fontWeight: 700, letterSpacing: 3,
  color: '#FF5C00', textTransform: 'uppercase' as const, margin: '20px 0 10px',
};

const dataCard: React.CSSProperties = {
  backgroundColor: '#141414',
  borderRadius: 10,
  border: '1px solid #1e1e1e',
  padding: '4px 16px',
  marginBottom: 8,
};
const dataRow: React.CSSProperties = {
  borderBottom: '1px solid #1e1e1e', padding: '10px 0',
};
const dataLabelStyle: React.CSSProperties = { width: 110 };
const dataLabelText: React.CSSProperties = {
  fontSize: 9, fontWeight: 700, letterSpacing: 2,
  color: '#444', textTransform: 'uppercase' as const, margin: 0,
};
const dataValue: React.CSSProperties = {
  fontSize: 13, fontWeight: 600, color: '#f5f5f5', margin: 0,
};
const dataLink: React.CSSProperties = {
  fontSize: 13, fontWeight: 600, color: '#FF5C00', textDecoration: 'none',
};

const serviceRow: React.CSSProperties = { borderBottom: '1px solid #1e1e1e', padding: '8px 0' };
const serviceDesc: React.CSSProperties = { fontSize: 13, color: '#f5f5f5', margin: 0 };
const serviceQty: React.CSSProperties = {
  fontSize: 12, color: '#555', margin: 0, textAlign: 'center' as const,
};
const servicePrice: React.CSSProperties = {
  fontSize: 13, fontWeight: 700, color: '#f5f5f5', margin: 0, textAlign: 'right' as const,
};
const totalLabel: React.CSSProperties = {
  fontSize: 9, fontWeight: 700, letterSpacing: 3,
  color: '#555', textTransform: 'uppercase' as const, margin: 0,
};
const totalValue: React.CSSProperties = {
  fontSize: 24, fontWeight: 900, color: '#FF5C00', margin: 0, textAlign: 'right' as const,
};
const obsText: React.CSSProperties = { fontSize: 13, color: '#888', lineHeight: 1.6, margin: 0 };

const ctaBtn: React.CSSProperties = {
  display: 'inline-block',
  background: 'linear-gradient(135deg, #FF5C00, #FF3D00)',
  color: '#fff', fontWeight: 700, fontSize: 14,
  padding: '12px 24px', borderRadius: 999,
  textDecoration: 'none', marginRight: 10,
};
const ctaBtnSecondary: React.CSSProperties = {
  display: 'inline-block',
  background: 'transparent', color: '#888',
  fontWeight: 600, fontSize: 13,
  padding: '12px 20px', borderRadius: 999,
  textDecoration: 'none', border: '1px solid #252525',
};
const footer: React.CSSProperties = {
  fontSize: 11, color: '#333',
  textAlign: 'center' as const, margin: '20px 0 0',
};
