import { useState, useRef, useEffect } from 'react';
import './Contact.css';
import heart from '../assets/decorations/heart.png';
import rainbow from '../assets/decorations/rainbow.png';
import strawberry from '../assets/decorations/strawberry.png';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xnjjbwor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div className={`contact-container ${isVisible ? 'visible' : ''}`}>
        <h2 className="section-title">
          <img src={heart} alt="heart" className="title-icon-img" />
          Get In Touch
        </h2>
        <p className="contact-intro">
          Have a project in mind or just want to say hi? I'd love to hear from you!
        </p>

        {submitted ? (
          <div className="success-message">
            <img src={rainbow} alt="rainbow" className="success-icon-img" />
            <p>Thanks for your message! I'll get back to you soon.</p>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your message..."
              ></textarea>
            </div>
            <button
              type="submit"
              className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <img src={strawberry} alt="strawberry" className="btn-icon-img" />
                </>
              )}
            </button>
          </form>
        )}

        <div className="social-links">
          <a href="https://www.linkedin.com/in/jemimah-ra" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
            <span>LinkedIn</span>
          </a>
          <a href="mailto:jemimah0810@gmail.com" className="social-link" aria-label="Email">
            <span>Email</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;
