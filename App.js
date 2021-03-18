import React from 'react';
import {StyleSheet,View,Button,TextInput,Component} from 'react-native';

import io from 'socket.io-client';



import { Text } from 'react-native';

class chat1 extends React.Component{
  
    constructor(props) {
        super(props);
        this.state = {
           chatMessage: "",
           chatMessages: ["saket","raman"]
        };   
     }
     componentDidMount() {
      
        this.socket = io("http://192.168.0.4:5000",{query: "email=raman.saket17@gmail.com"});
        console.log("ss");
         this.socket.on("recieve_message", msg => {
           console.log(msg);
               this.setState({ chatMessages: [...this.state.chatMessages, msg.message] 
                  
          });
        });

     }
     submitChatMessage=async()=> {
       console.log('Archu');
       var msg = {
         senderid: "raman.saket17@gmail.com",
         recieverid: "agrawalarchana2015@gmail.com",
         message: this.state.chatMessage,
       }
        this.socket.emit('send_message',msg);
        this.setState({chatMessage: ''});
     }
     getuser=async()=>{
       const res=
     await fetch("http://192.168.0.8:3000/allUsers",
      {
         method:"post",
          headers:
          {
            'Content-Type':'application/json',
            
         
          },
          body:JSON.stringify({
            email:"raman.saket17@gmail.com"
          })
      })
      const data = await res.json();
      console.log(data); 
     }
    //  addmsg= async()=>{
    // //    //let chatmsgs = this.state.chatmsgs;
    //    console.log("Archana");
    // //     const chatMessagesa = this.state.chatMessages.map(chatMessage => (
    // //       <Text style={{borderWidth: 2, top: 500}}>{chatMessage}</Text>
          
    // //     )),
    //    chatMessages.push(this.state.chatMessage);
    //    this.setState({
    //      chatMessages
    //    });
      //}
     
    render() {
      const chatMessagesa = this.state.chatMessages.map(chatMessage => (
        <Text style={{borderWidth: 2, top: 500}}>{chatMessage}</Text>
        
      ))
          
      return (
        <View>
          {chatMessagesa}

        <TextInput
          style={styles.input}
          placeholder={'type some message'}
          value={this.state.chatMessage}
          
          onChangeText={chatMessage => {
            this.setState({chatMessage});
          }}
          
        />
        <Button
          title={'Send'}
          style={styles.sendButton}
          onPress={async () => {
            try {
              // await addelement();
              //await this.addmsg();
              
              this.state.chatMessages.push(this.state.chatMessage);
              await this.submitChatMessage();
              
            } catch (e) {
              // setError(e.message);
              // setLoading(false);
            }
            
          }}
          />
          <Button
          title={'get'}
          style={styles.getButton}
          onPress={ () => this.getuser()}
          />



          
          
          
          </View>
          
    
    );
   }
}

const styles = StyleSheet.create({
  
    input: {
      marginTop: 200,
    },
    sendButton: {
      marginTop:5 ,
    },
    getButton: {
      marginTop:5 ,
    },
    text:{
        fontSize: 20
    }
  });
  export default chat1