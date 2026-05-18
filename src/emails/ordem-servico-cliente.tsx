import {
  Body, Column, Container, Head, Heading, Hr, Html,
  Img, Link, Preview, Row, Section, Text,
} from '@react-email/components';

interface OSItem { description: string; qty: string; price: string }

interface Props {
  osNum?: string;
  date?: string;
  nomeFantasia?: string;
  responsavel?: string;
  telefone?: string;
  items?: OSItem[];
  obs?: string;
  total?: string;
}

export default function OrdemServicoCliente({
  osNum = '250518-1400',
  date = '18/05/2025',
  nomeFantasia = 'Padaria Central',
  responsavel = 'João Silva',
  telefone = '(11) 99999-0000',
  items = [
    { description: 'Configuração do Perfil da Empresa no Google', qty: '1', price: '350' },
    { description: 'Estratégia de avaliações', qty: '1', price: '' },
  ],
  obs = '',
  total = '350,00',
}: Props) {
  const nome = responsavel || nomeFantasia || 'Cliente';
  const empresa = nomeFantasia || '';
  const waLink = `https://wa.me/5511982864581`;

  return (
    <Html>
      <Head />
      <Preview>OS #{osNum} confirmada — {empresa ? `${empresa} · ` : ''}Salto</Preview>
      <Body style={body}>
        <Container style={outer}>

          {/* Header */}
          <Section style={header}>
            <Row>
              <Column>
                <Img src="https://saltoup.com/logo.svg" alt="Salto" width="120" height="37" style={{ display: 'block', marginBottom: 4 }} />
                <Text style={logoSub}>saltoup.com</Text>
              </Column>
              <Column style={{ textAlign: 'right' }}>
                <Text style={osLabel}>Ordem de Serviço</Text>
                <Text style={osNum_}>#{osNum}</Text>
                <Text style={osDate}>{date}</Text>
              </Column>
            </Row>
          </Section>

          <Container style={card}>

            {/* Greeting */}
            <Section style={{ padding: '32px 32px 0' }}>
              <Text style={badgeText}>● OS CONFIRMADA</Text>
              <Heading style={heading}>
                Tudo certo, {nome}!
              </Heading>
              <Text style={subtext}>
                {empresa ? <><span>A ordem de serviço para </span><strong>{empresa}</strong><span> foi gerada com sucesso.</span></> : 'Sua ordem de serviço foi gerada com sucesso.'}{' '}
                Abaixo estão todos os detalhes do serviço contratado.
              </Text>
              <Hr style={divider} />
            </Section>

            {/* Services */}
            <Section style={{ padding: '0 32px' }}>
              <Text style={sectionLabel}>Serviços contratados</Text>

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
                <Row style={{ marginTop: 12, paddingTop: 12, borderTop: '2px solid #111' }}>
                  <Column>
                    <Text style={totalLabel}>TOTAL</Text>
                  </Column>
                  <Column style={{ textAlign: 'right' }}>
                    <Text style={totalValue}>R$ {total}</Text>
                  </Column>
                </Row>
              )}
            </Section>

            {obs && (
              <Section style={{ padding: '0 32px' }}>
                <Hr style={divider} />
                <Text style={obsLabel}>Observações</Text>
                <Text style={obsText}>{obs}</Text>
              </Section>
            )}

            <Hr style={{ ...divider, margin: '24px 32px' }} />

            {/* Contact CTA */}
            <Section style={{ padding: '0 32px 32px' }}>
              <Text style={subtext}>
                Tem alguma dúvida sobre o serviço? Fale diretamente comigo pelo WhatsApp — respondo rapidinho.
              </Text>
              <Link href={waLink} style={ctaBtn}>
                Falar com Bruno no WhatsApp →
              </Link>
              {telefone && (
                <Text style={footNote}>Seu contato registrado: {telefone}</Text>
              )}
            </Section>

          </Container>

          {/* Footer */}
          <Text style={footer}>
            Bruno Vieira · Salto · saltoup.com{'\n'}
            Este e-mail foi gerado automaticamente após a emissão da sua OS.
          </Text>

        </Container>
      </Body>
    </Html>
  );
}

// ─── Styles ───────────────────────────────────────────────

const body: React.CSSProperties = {
  backgroundColor: '#0e0e0e',
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  margin: 0,
  padding: '40px 16px',
};

const outer: React.CSSProperties = { maxWidth: 580, margin: '0 auto' };

const header: React.CSSProperties = {
  background: 'linear-gradient(135deg, #1a0800 0%, #0e0e0e 100%)',
  borderRadius: '16px 16px 0 0',
  border: '1px solid #252525',
  borderBottom: 'none',
  padding: '28px 32px',
};

const logoText: React.CSSProperties = {
  fontSize: 22, fontWeight: 900, color: '#f5f5f5',
  letterSpacing: -1, margin: '0 0 2px',
};
const logoDot: React.CSSProperties = { color: '#FF5C00' };
const logoSub: React.CSSProperties = {
  fontSize: 10, color: '#555', letterSpacing: 2,
  textTransform: 'uppercase' as const, margin: 0,
};
const osLabel: React.CSSProperties = {
  fontSize: 9, color: '#FF5C00', letterSpacing: 3,
  textTransform: 'uppercase' as const, margin: '0 0 2px', fontWeight: 700,
};
const osNum_: React.CSSProperties = {
  fontSize: 20, fontWeight: 900, color: '#f5f5f5', margin: '0 0 2px',
};
const osDate: React.CSSProperties = { fontSize: 11, color: '#555', margin: 0 };

const card: React.CSSProperties = {
  backgroundColor: '#141414',
  border: '1px solid #252525',
  borderTop: 'none',
  borderRadius: '0 0 16px 16px',
  overflow: 'hidden',
};

const badgeText: React.CSSProperties = {
  fontSize: 10, fontWeight: 700, letterSpacing: 2,
  color: '#FF5C00', margin: '0 0 12px',
  textTransform: 'uppercase' as const,
};

const heading: React.CSSProperties = {
  fontSize: 28, fontWeight: 900, color: '#f5f5f5',
  margin: '0 0 12px', letterSpacing: -0.5, lineHeight: 1.2,
};

const subtext: React.CSSProperties = {
  fontSize: 14, lineHeight: 1.7, color: '#888', margin: '0 0 20px',
};

const divider: React.CSSProperties = { borderColor: '#252525', margin: '20px 0' };

const sectionLabel: React.CSSProperties = {
  fontSize: 9, fontWeight: 700, letterSpacing: 3,
  color: '#FF5C00', textTransform: 'uppercase' as const, margin: '24px 0 12px',
};

const serviceRow: React.CSSProperties = {
  borderBottom: '1px solid #1e1e1e', padding: '8px 0',
};
const serviceDesc: React.CSSProperties = { fontSize: 13, color: '#f5f5f5', margin: 0 };
const serviceQty: React.CSSProperties = {
  fontSize: 12, color: '#666', margin: 0, textAlign: 'center' as const,
};
const servicePrice: React.CSSProperties = {
  fontSize: 13, fontWeight: 700, color: '#f5f5f5', margin: 0, textAlign: 'right' as const,
};

const totalLabel: React.CSSProperties = {
  fontSize: 9, fontWeight: 700, letterSpacing: 3,
  color: '#888', textTransform: 'uppercase' as const, margin: 0,
};
const totalValue: React.CSSProperties = {
  fontSize: 24, fontWeight: 900, color: '#FF5C00', margin: 0, textAlign: 'right' as const,
};

const obsLabel: React.CSSProperties = {
  fontSize: 9, fontWeight: 700, letterSpacing: 3,
  color: '#888', textTransform: 'uppercase' as const, margin: '0 0 6px',
};
const obsText: React.CSSProperties = { fontSize: 13, color: '#888', lineHeight: 1.6, margin: 0 };

const ctaBtn: React.CSSProperties = {
  display: 'inline-block',
  background: 'linear-gradient(135deg, #FF5C00, #FF3D00)',
  color: '#fff',
  fontWeight: 700, fontSize: 14,
  padding: '14px 28px',
  borderRadius: 999,
  textDecoration: 'none',
};

const footNote: React.CSSProperties = {
  fontSize: 11, color: '#444', margin: '16px 0 0',
};

const footer: React.CSSProperties = {
  fontSize: 11, color: '#333', textAlign: 'center' as const,
  margin: '24px 0 0', lineHeight: 1.7,
};
