import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Column,
  Section,
  Text,
} from "@react-email/components";

interface NovoContatoProps {
  name: string;
  email: string;
  phone: string;
}

export default function NovoContato({ name = "João Silva", email = "joao@exemplo.com", phone = "+55 11 99999-9999" }: NovoContatoProps) {
  const waLink = `https://wa.me/${phone.replace(/\D/g, "")}`;

  return (
    <Html>
      <Head />
      <Preview>🔔 Novo lead: {name} quer um diagnóstico</Preview>
      <Body style={body}>

        {/* Outer wrapper with glow */}
        <Container style={outer}>
          <Container style={container}>

            {/* Header com glow */}
            <Section style={headerSection}>
              <div style={glowBg} />
              <Text style={logoText}>SALTO<span style={logoDot}>·</span></Text>
              <Text style={headerLabel}>NOVO CONTATO VIA SITE</Text>
            </Section>

            {/* Badge */}
            <Section style={badgeSection}>
              <Text style={badge}>● DIAGNÓSTICO SOLICITADO</Text>
            </Section>

            <Heading style={heading}>
              {name} quer conversar
            </Heading>

            <Text style={subtext}>
              Um novo visitante preencheu o formulário de diagnóstico. Responda em até 24h para maximizar a chance de conversão.
            </Text>

            <Hr style={divider} />

            {/* Dados do lead */}
            <Section style={dataCard}>
              <Row style={dataRow}>
                <Column style={dataLabel}>NOME</Column>
                <Column style={dataValue}>{name}</Column>
              </Row>
              <Hr style={dataRowDivider} />
              <Row style={dataRow}>
                <Column style={dataLabel}>E-MAIL</Column>
                <Column>
                  <Link href={`mailto:${email}`} style={dataLink}>{email}</Link>
                </Column>
              </Row>
              <Hr style={dataRowDivider} />
              <Row style={dataRow}>
                <Column style={dataLabel}>WHATSAPP</Column>
                <Column>
                  <Link href={waLink} style={dataLink}>{phone}</Link>
                </Column>
              </Row>
            </Section>

            {/* CTA */}
            <Section style={ctaSection}>
              <Link href={waLink} style={ctaButton}>
                Responder no WhatsApp →
              </Link>
              <Link href={`mailto:${email}`} style={ctaButtonSecondary}>
                Responder por e-mail
              </Link>
            </Section>

            <Hr style={divider} />

            <Text style={footer}>
              Enviado automaticamente via saltoup.com · {new Date().toLocaleDateString("pt-BR")}
            </Text>

          </Container>
        </Container>
      </Body>
    </Html>
  );
}

// ─── Styles ───────────────────────────────────────────────

const body: React.CSSProperties = {
  backgroundColor: "#080808",
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  margin: "0",
  padding: "40px 16px",
};

const outer: React.CSSProperties = {
  maxWidth: "580px",
  margin: "0 auto",
};

const container: React.CSSProperties = {
  backgroundColor: "#0e0e0e",
  borderRadius: "16px",
  border: "1px solid #252525",
  overflow: "hidden",
};

const headerSection: React.CSSProperties = {
  position: "relative",
  background: "linear-gradient(135deg, #1a0800 0%, #0e0e0e 60%)",
  padding: "32px 32px 24px",
  borderBottom: "1px solid #252525",
};

const glowBg: React.CSSProperties = {
  position: "absolute",
  top: "-40px",
  right: "-40px",
  width: "200px",
  height: "200px",
  borderRadius: "50%",
  background: "radial-gradient(circle, rgba(255,92,0,0.15) 0%, transparent 70%)",
  pointerEvents: "none",
};

const logoText: React.CSSProperties = {
  fontSize: "22px",
  fontWeight: "900",
  letterSpacing: "-1px",
  color: "#f5f5f5",
  margin: "0 0 8px",
};

const logoDot: React.CSSProperties = {
  color: "#FF5C00",
};

const headerLabel: React.CSSProperties = {
  fontSize: "10px",
  fontWeight: "700",
  letterSpacing: "3px",
  color: "#FF5C00",
  margin: "0",
  textTransform: "uppercase" as const,
};

const badgeSection: React.CSSProperties = {
  padding: "20px 32px 0",
};

const badge: React.CSSProperties = {
  display: "inline-block",
  fontSize: "10px",
  fontWeight: "700",
  letterSpacing: "2px",
  color: "#FF5C00",
  border: "1px solid rgba(255,92,0,0.3)",
  borderRadius: "999px",
  padding: "5px 14px",
  margin: "0",
  textTransform: "uppercase" as const,
};

const heading: React.CSSProperties = {
  fontSize: "26px",
  fontWeight: "900",
  color: "#f5f5f5",
  margin: "16px 32px 12px",
  letterSpacing: "-0.5px",
  lineHeight: "1.2",
};

const subtext: React.CSSProperties = {
  fontSize: "14px",
  lineHeight: "1.7",
  color: "#888888",
  margin: "0 32px 24px",
};

const divider: React.CSSProperties = {
  borderColor: "#1e1e1e",
  margin: "0 32px",
};

const dataCard: React.CSSProperties = {
  margin: "24px 32px",
  backgroundColor: "#141414",
  borderRadius: "12px",
  border: "1px solid #252525",
  padding: "8px 20px",
};

const dataRow: React.CSSProperties = {
  padding: "14px 0",
};

const dataRowDivider: React.CSSProperties = {
  borderColor: "#252525",
  margin: "0",
};

const dataLabel: React.CSSProperties = {
  fontSize: "10px",
  fontWeight: "700",
  letterSpacing: "2px",
  color: "#666666",
  textTransform: "uppercase" as const,
  width: "110px",
  verticalAlign: "middle",
};

const dataValue: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#f5f5f5",
  verticalAlign: "middle",
};

const dataLink: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#FF5C00",
  textDecoration: "none",
};

const ctaSection: React.CSSProperties = {
  padding: "24px 32px",
  textAlign: "center" as const,
};

const ctaButton: React.CSSProperties = {
  display: "inline-block",
  background: "linear-gradient(135deg, #FF5C00, #FF3D00)",
  color: "#ffffff",
  fontWeight: "700",
  fontSize: "14px",
  padding: "14px 32px",
  borderRadius: "999px",
  textDecoration: "none",
  marginRight: "12px",
  marginBottom: "12px",
};

const ctaButtonSecondary: React.CSSProperties = {
  display: "inline-block",
  background: "transparent",
  color: "#888888",
  fontWeight: "600",
  fontSize: "13px",
  padding: "14px 24px",
  borderRadius: "999px",
  textDecoration: "none",
  border: "1px solid #252525",
};

const footer: React.CSSProperties = {
  fontSize: "11px",
  color: "#444444",
  margin: "16px 32px",
  textAlign: "center" as const,
};
