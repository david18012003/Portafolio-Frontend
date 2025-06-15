export default function Contact({phone, email, linkedin, github}) {
    return (
      <section>
        <h2>Contacto</h2>
        <p>Email: {email}</p>
        <p>Teléfono: {phone}</p>
        <a href={linkedin} target="_blank">LinkedIn</a>
        <a href={github} target="_blank">GitHub</a>
      </section>
    )
  }
  