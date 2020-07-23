import React, { useCallback, createContext, useReducer, useContext, useState, useEffect } from "react"
import { generateUUID } from 'pubnub';
import PubNub, { SubscribeParameters } from "pubnub";
import keyConfiguration from "../src/config/pubnub-keys.json";
import { debug } from "console";
import Blank from './';


const generatedName = generateName(); //This is our UUID that we use when needed for  messages.

//This is the configuration for our PubNub connection.
//We merge the keys from KeyConfiguration with basic configuration options for PubNub
const pubnubConfig = Object.assign(
  {},
  {
      restore: true,       // Ensure that subscriptions will be retained if the network connection is lost
      uuid: generatedName, // Our connection unique identifier, very important to avoid being charged for the same user in MAU mode.
      ssl: true, //Encrypted end to end from  browser to PubNub network.
      presenceTimeout: 120, // 
  },
  keyConfiguration //Our keys extracted from the config directory in  the  pubnub-keys.json file
);

//This is where you define the Live Event Properties.
export const appData: AppState = {
  maxMessagesInList: 200, //Max number of messages at most in the message list.
  selfAvatar: "https://robohash.org/"+generatedName+".jpg?size=50x50&set=set1", //The URL for the avatar graphic file
  selfName: generatedName,
  messages: [], //Array of UserMessages.
  pubnubConf: pubnubConfig,  //This is our configuration for the channel used for exchanging messages among event participants.  
  defaultchannel: "global",
  pubnub: new PubNub({
    publishKey: pubnubConfig.publishKey,
    subscribeKey: pubnubConfig.subscribeKey
  }),
  message: "",
}

function capFirst(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateName(): string{
  var name1 = ["Darwin","Natalee","Ryann","Maggie","Scarlet","Kassidy","Matteo","Ethen","Zain","Vivian","Tess","Krystal","Liberty","Brielle","Jaycee","Sylvia","Eden","Arianna","Martha","Jayson","Lainey","Jorden","Daniela","Mohammad","Kathleen","Reuben","Shane","Annie","Logan","Bo","Darius","Nadia","Cristal","Reid","Thomas","Anna","Javion","Gabriel","Bennett","Jerimiah","Connor","Bryant","Parker","Livia","Ellie","Esteban","Morgan","Toby","Saige","Imani","Semaj","Manuel","Ansley","Miah","Ezequiel","Makenzie","Vincent","Jacquelyn","Rowan","Leyla","Evangeline","Ella","Briana","Aaron","Ciara","Karla","Jeffrey","Damarion","Raul","Derick","Jarrett","Frances","Xiomara","Monica","Deon","Abigail","Beau","Angel","Reese","Kylee","Ana","Laci","Madden","Kaleigh","Eduardo","Leilani","Aron","Samson","Trevon","Cloe","Jillian","Avery","Skylar","Autumn","Lesly","Gael","Emilio","Mylee","Courtney","Francesca","Jaydan","Josie","Victoria","Jan","Iliana","Alannah","Veronica","Izaiah","Stacy","Callie","Cynthia","Gilberto","Katelynn","Jaylen","Anahi","Olivia","Lincoln","Niko","Kiana","Harold","Lauren","Adyson","Jewel","Adriana","Mike","Eve","Johanna","Maximillian","Jakayla","Tatiana","Jake","Tony","Marlene","Sara","Jaylynn","Jeffery","Bryson","Jesus","Odin","Anderson","Chris","Cadence","Alfredo","Janiah","Matias","Camren","Nehemiah","Cannon","Dillon","Kierra","Lila","Janet","Jaelyn","Roland","Deacon","Lilly","Mallory","Ryan","Leo","Carleigh","Emma","Evelyn","Jordin","Blaine","Maleah","Clayton","Ryker","Gerald","Zack","Alfred","Julianna","Finn","Yadira","Bailey","Jaylan","Cesar","Arielle","Michaela","Tyson","Lindsey","Elias","Carla","Aedan","Ashley","Charles","Enzo","Luis","Killian","Samir","Reece","Yandel","Teresa","Mckinley","Kendra","Camryn","Zavier","Cody","Ralph","Brooklynn","Casey","Maeve","Jayvon","Davion","Giada","Cierra","Marshall","Alyvia","Rodolfo","Demarion","Hana","Esther","Jose","Alena","Kamren","Deven","Tianna","Beckett","Phoenix","Cayden","Hazel","Denise","Kingston","Charlie","Miguel","Carissa","Jairo","Adolfo","Kaley","Jaron","Miracle","Micaela","Ally","Louis","Kyan","Nicolas","Steve","Jackson","Mckenzie","Drake","Willie","Cali","Joanna","Kareem","Halle","Amina","Chandler","Melanie","Darian","Hassan","Keyla"];
  var name2 = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
  var first = capFirst(name1[getRandomInt(1, name1.length)]);
  var last = capFirst(name2[getRandomInt(1, name2.length)]);
  return (first + last);
}

interface User {
  id: string,
  username: string,
}

interface UserList {
  id: string,
  listname: string,
  users: User[],
}

export interface Message {
  internalKey: string ;
}

export class UserMessage implements Message {
  message: string;
  UserAvatar?: string;
  senderName: string;

  constructor(payload: string) {
    const tmpKey = generateUUID();
    this.internalKey = tmpKey;
    var data = JSON.parse(payload);
    if (!data.key ) {
      throw new Error('Invalid message payload received: ' + payload);
    }

    this.message = data.message;
    this.UserAvatar= data.UserAvatar;
    this.senderName= data.senderName;
  }
}

//This is the default settings for your chat app.
export interface AppState {
  maxMessagesInList: number,
  message: string;
  selfAvatar: string,
  selfName: string,
  messages: UserMessage[], //Where the  Messages from all participants to the event are stored.
  pubnub: PubNub,
  pubnubConf: typeof pubnubConfig, //Our link to PubNub
  defaultchannel: SubscribeParameters //The default channel associated to the demo, should be associated with an Event.
}

type Action =
  {
    type: "ADD_MESSAGE",
    payload: string
  }
  | {
    type: "SEND_MESSAGE",
    payload: {
      messageContent: string
    }
  }

interface AppStateContextProps {
  state: AppState,
  
}

export const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
)

//The functions below are accessible through passing parameters to a dispatch function always accessible in our components. 
export const appStateReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {

    //ADD_MESSAGE adds an incoming message to our internal MessageList buffer.
    case "ADD_MESSAGE": {
      //If the messagelist is over our cap we discard the oldest message in the list.
      if (state.messages.length > state.maxMessagesInList ){
        state.messages.shift();
      }

      const debugMerged: AppState = {
        ...state,
        messages: [
          ...state.messages as Array<UserMessage>,
          {
            ...action.payload
          }
        ]
      };

      return debugMerged;
    }
    case "SEND_MESSAGE": {
      state.pubnub.publish({
        channel: state.defaultchannel,
        message: {
          "message": action.payload,
          "UserAvatar": state.selfAvatar,
          "senderName": state.selfName,
        },
      });

      return { ...state }
    }

    default: {
      return state
    }


  }
}



export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {

  const [state, dispatch] = useReducer(appStateReducer, appData)
  useEffect(() => {
    try {
 
      //This where PubNub receives messages subscribed by the channel.
      state.pubnub.addListener({
        message: (messageEvent) => {
          //console.log(`RECEIVING MESSAGE ${messageEvent.message.key}`);
          dispatch({
            type: "ADD_MESSAGE",
            payload: messageEvent.message
          });
        },

      });

    //   state.pubnub.addListener({
    //     presence: function(p) {
    //       console.log(JSON.stringify(p));
    //         // handle presence
    //         var action = p.action; // Can be join, leave, state-change or timeout
    //         var channelName = p.channel; // The channel for which the message belongs
    //         var occupancy = p.occupancy; // No. of users connected with the channel
    //         var state = p.state; // User State
    //         var channelGroup = p.subscription; //  The channel group or wildcard subscription match (if exists)
    //         var publishTime = p.timestamp; // Publish timetoken
    //         var timetoken = p.timetoken;  // Current timetoken
    //         var uuid = p.uuid; // UUIDs of users who are connected with the channel
    //     }
    // });

      //Lets' subscribe on the default channel.
      state.pubnub.subscribe({
        channels: [state.defaultchannel], // Only one channel, split in different rows if required and load in props, can be set by load balancer.
        withPresence: true, // Presence can be set to false here.
      });

      //Get the history on the default channel.
      state.pubnub.history(
          {
              channel: state.defaultchannel,
              count: 100 // 100 is the default
          },
          (status, response) => {
            if (typeof response.messages !== "undefined" && response.messages.length > 0) {
              for (var i = 0; i <= response.messages.length; i++) {
                dispatch({
                  type: "ADD_MESSAGE",
                  payload: response.messages[i].entry
                });
              }
            }
          }
      );

    } catch (e) {
      console.log(`Subscribe error ${e.message}`);
    }

  }, [appData]);


  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
}

export const useAppState = () => {
  return useContext(AppStateContext)
}
