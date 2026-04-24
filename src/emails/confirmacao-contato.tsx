import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ConfirmacaoContatoProps {
  name: string;
}

export default function ConfirmacaoContato({ name = "João" }: ConfirmacaoContatoProps) {
  return (
    <Html>
      <Head />
      <Preview>Recebi sua mensagem, {name}. Vamos dar o próximo salto juntos.</Preview>
      <Body style={body}>
        <Container style={outer}>
          <Container style={container}>

            {/* Hero header com glow */}
            <Section style={heroSection}>
              <Text style={logoText}>SALTO<span style={logoDot}>·</span></Text>

              <Heading style={heroHeading}>
                Mensagem recebida,<br />{name}. 🚀
              </Heading>

              <Text style={heroSub}>
                Seu diagnóstico gratuito está na fila de prioridade.
              </Text>
            </Section>

            {/* Body */}
            <Section style={bodySection}>

              {/* Processo */}
              <Section style={stepCard}>
                <Text style={stepNumber}>01</Text>
                <Text style={stepTitle}>Diagnóstico em preparação</Text>
                <Text style={stepDesc}>
                  Vou estudar o seu perfil e preparar um diagnóstico personalizado antes do nosso primeiro contato.
                </Text>
              </Section>

              <Section style={stepCard}>
                <Text style={stepNumber}>02</Text>
                <Text style={stepTitle}>Entro em contato em breve</Text>
                <Text style={stepDesc}>
                  Prefere não esperar? Me chame agora diretamente no WhatsApp:
                </Text>
                <Link href="https://wa.me/5511982864581?text=Olá%20Bruno!%20Acabei%20de%20preencher%20o%20formulário%20no%20site%20da%20Salto." style={ctaButton}>
                  Falar no WhatsApp agora →
                </Link>
              </Section>

            </Section>

            <Hr style={divider} />

            {/* Assinatura */}
            <Section style={signatureSection}>
              <Text style={signatureName}>Bruno Vieira</Text>
              <Text style={signatureRole}>Fundador · Salto</Text>
              <Link href="https://saltoup.com" style={signatureUrl}>saltoup.com</Link>
            </Section>

            {/* Footer */}
            <Section style={footerSection}>
              <Text style={footerText}>
                Você recebeu este e-mail porque preencheu o formulário em{" "}
                <Link href="https://saltoup.com" style={footerLink}>saltoup.com</Link>.
              </Text>
            </Section>

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

const heroSection: React.CSSProperties = {
  background: "linear-gradient(160deg, #1c0800 0%, #120500 40%, #0e0e0e 100%)",
  padding: "40px 36px 36px",
  borderBottom: "1px solid #252525",
};

const logoText: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: "900",
  letterSpacing: "2px",
  color: "#888888",
  margin: "0 0 28px",
  textTransform: "uppercase" as const,
};

const logoDot: React.CSSProperties = {
  color: "#FF5C00",
};

const heroHeading: React.CSSProperties = {
  fontSize: "32px",
  fontWeight: "900",
  color: "#f5f5f5",
  margin: "0 0 14px",
  letterSpacing: "-1px",
  lineHeight: "1.15",
};

const heroSub: React.CSSProperties = {
  fontSize: "15px",
  color: "#FF5C00",
  fontWeight: "600",
  margin: "0",
};

const bodySection: React.CSSProperties = {
  padding: "28px 36px",
};

const stepCard: React.CSSProperties = {
  backgroundColor: "#141414",
  borderRadius: "12px",
  border: "1px solid #252525",
  padding: "20px 24px",
  marginBottom: "12px",
};

const stepNumber: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: "900",
  color: "#FF5C00",
  letterSpacing: "2px",
  margin: "0 0 8px",
};

const stepTitle: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: "700",
  color: "#f5f5f5",
  margin: "0 0 6px",
};

const stepDesc: React.CSSProperties = {
  fontSize: "13px",
  lineHeight: "1.7",
  color: "#888888",
  margin: "0 0 16px",
};

const ctaButton: React.CSSProperties = {
  display: "inline-block",
  background: "linear-gradient(135deg, #FF5C00, #FF3D00)",
  color: "#ffffff",
  fontWeight: "700",
  fontSize: "13px",
  padding: "12px 24px",
  borderRadius: "999px",
  textDecoration: "none",
};

const divider: React.CSSProperties = {
  borderColor: "#1e1e1e",
  margin: "0 36px",
};

const signatureSection: React.CSSProperties = {
  padding: "24px 36px",
};

const signatureName: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "700",
  color: "#f5f5f5",
  margin: "0",
};

const signatureRole: React.CSSProperties = {
  fontSize: "12px",
  color: "#666666",
  margin: "4px 0 0",
};

const signatureUrl: React.CSSProperties = {
  fontSize: "12px",
  color: "#FF5C00",
  textDecoration: "none",
  display: "block",
  marginTop: "4px",
};

const footerSection: React.CSSProperties = {
  backgroundColor: "#0a0a0a",
  borderTop: "1px solid #1e1e1e",
  padding: "16px 36px",
};

const footerText: React.CSSProperties = {
  fontSize: "11px",
  color: "#444444",
  margin: "0",
  textAlign: "center" as const,
};

const footerLink: React.CSSProperties = {
  color: "#666666",
  textDecoration: "none",
};
