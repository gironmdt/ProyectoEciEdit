/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.controller;

/**
 *
 * @author estudiantes
 */
import Proyecto.Logica.Documentos.Documento;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import edu.eci.arsw.model.*;

@Controller
public class MessageController {
    @MessageMapping("/message")
    @SendTo("/topic/messages")
    public Documento serverMessage(Documento message) throws Exception {
            Thread.sleep(3000); // simulated delay
            return message;
    }
}
