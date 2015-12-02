/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.controller;

import Proyecto.Logica.Documentos.Documento;
import edu.eci.arsw.model.Entry;
import java.util.List;
import java.util.Set;
import java.util.concurrent.atomic.AtomicLong;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author paola
 */
@RestController 
//@RequestMapping("")
public class Controlador {
    private final AtomicLong counter = new AtomicLong();
    private Documento doc = new Documento();
    
    @Autowired(required = false)
    private SimpMessagingTemplate template; 
    
    @RequestMapping(method = RequestMethod.GET,value = "/getDocumento") 
    public Documento getDocumento() {
        return doc;
    }
    
    @RequestMapping(method = RequestMethod.POST,value = "/setDocumento")
    public  ResponseEntity<?>  setDocumento(@RequestBody Documento p) {
        doc.setTexto(p.getTexto());
        template.convertAndSend("/topic/messages",p);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
    
}
