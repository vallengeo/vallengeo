package com.vallengeo.portal.service;

import com.vallengeo.core.exceptions.custom.ValidatorException;
import com.vallengeo.core.util.Mail;
import com.vallengeo.portal.model.Usuario;
import com.vallengeo.portal.repository.ModuloRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import static com.vallengeo.core.util.Constants.NOT_FOUND;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender emailSender;
    private final SpringTemplateEngine templateEngine;
    private final MessageSource messageSource;
    private final ModuloRepository moduloRepository;

    private static final String USER = "user";
    private static final String BASE_URL = "baseUrl";

    @Value("${spring.mail.username}")
    private String mailFrom;


    public void enviarEmailCriacaoConta(Usuario usuario,  String modulo) {
        log.debug("Sending creation email to '{}'", usuario.getEmail());
        this.sendEmailFromTemplate(usuario, "mail/criacaoConta", "email.creation.title", modulo);
    }

    public void enviaEmailRedefinirSenha(Usuario usuario, String modulo) {
        log.debug("Sending password reset email to '{}'", usuario.getEmail());
        this.sendEmailFromTemplate(usuario, "mail/esqueciMinhaSenha", "email.reset.title", modulo);
    }

    private void sendEmail(Mail mail) {
        try {
            MimeMessage message = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message,
                    MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                    StandardCharsets.UTF_8.name());

            String html = getHtmlContent(mail);

            helper.setFrom(mailFrom);
            helper.setTo(mail.getTo());
            helper.setSubject(mail.getSubject());
            helper.setText(html, true);

            emailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    private void sendEmailFromTemplate(Usuario user, String templateName, String titleKey, String modulo) {
        if (user.getEmail() == null) {
            log.debug("Email doesn't exist for user '{}'", user.getId());
            throw new ValidatorException("Email " + NOT_FOUND + " para o usuário " + user.getId());
        } else {
            Locale locale = Locale.forLanguageTag("pt-BR");
            Context context = new Context(locale);
            context.setVariable(USER, user);

            var moduloEntity = moduloRepository.findByCodigo(modulo).orElseThrow(() -> new ValidatorException("Módulo " + modulo + NOT_FOUND));
            Map<String, Object> properties = new HashMap<>();
            properties.put(BASE_URL, moduloEntity.getUrl());
            properties.put(USER, user);

            Mail mail = Mail.builder()
                    .to(user.getEmail())
                    .subject(messageSource.getMessage(titleKey, null, locale))
                    .htmlTemplate(new Mail.HtmlTemplate(templateName, properties))
                    .build();

            sendEmail(mail);
        }
    }

    private String getHtmlContent(Mail mail) {
        Context context = new Context();
        context.setVariables(mail.getHtmlTemplate().getProps());
        return templateEngine.process(mail.getHtmlTemplate().getTemplate(), context);
    }
}
