export default function Contact({phone, email, linkedin}) {
    return (
      <section>
        <h2>Contacto</h2>
        <p>Email: {email}</p>
        <p>Teléfono: {phone}</p>
        <a href={linkedin} target="_blank">LinkedIn</a>
      </section>
    )
  }
  