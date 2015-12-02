/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Proyecto.Logica.Documentos;

/**
 *
 * @author paola
 */
public class Documento {
    private String texto="hola mundo Doc";
    
    //public Documento(String iTexto){
      //  this.texto=iTexto;
    //}
    public void setTexto(String iTexto){
        this.texto = iTexto;
    }
    
    public String getTexto(){
       return this.texto;
    }
}
