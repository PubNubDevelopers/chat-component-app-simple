# Simple Group Chat App 
### Featuring Reusable PubNub React Chat Components 

This project is a collection of reusable chat components that makes it simple to get started with PubNub in React. Each of the components are designed to be reusable, expandable, and easy to use in another React application. Anyone can build a robust chat app by using these components as a starting point. 

[Support Chat App](https://github.com/PubNubDevelopers/chat-component-app-live-support) was built using the components found in this project.

This project is an example of a group chat style chat experience using reusable chat components. It includes the basic features you would expect from a group chat.

*Important Note:* This project is a work in progress. It may contain incomplete code. Pull requests to fix bugs and add features are always welcomed.

<a href="https://www.pubnub.com/">
    <img alt="Component Chat Demo" src="https://github.com/PubNubDevelopers/chat-component-app-simple/raw/master/group-chat-components.png" width=800/>
</a>

## Included Components:
- Active Users - Displays a list of the active users in the chat and a total count.
- Message List - Displays the messages received in the chat and the chat history when first loaded.
- Compose - Provides input area for sending new messages to the chat.

## Components Coming Soon:
- Emoji - Adds emojis to the Compose component.
- Typing Indicator - Add typing indicator to the Compose component.
- Read Receipts - Updates Message List component with a timestamp of when messages were last read. 

## Notable Features:
- Group style chat with automatic creation of users.
- [PubNub Presence](https://www.pubnub.com/products/presence/) powered user activity.
- Message history.
## Requirements

- [Node.js](https://nodejs.org/en/)
- [PubNub Account](#pubnub-account) (*Free*) 

<a href="https://dashboard.pubnub.com/signup">
    <img alt="PubNub Signup" src="https://i.imgur.com/og5DDjf.png" width=260 height=97/>
</a>

## PubNub Account and App Setup

1. You’ll first need to sign up for a [PubNub account](https://dashboard.pubnub.com/signup/). Once you sign up, you can get your unique PubNub keys from the [PubNub Developer Portal](https://admin.pubnub.com/).

1. Sign in to your [PubNub Dashboard](https://dashboard.pubnub.com/).

1. Click **Create New App**.

1. Give your app a name, and select **Chat App** as the app type.

1. Click **Create**.

1. Click your new app to open its settings, then click its keyset.

1. [Enable the Channel Presence feature](https://support.pubnub.com/support/solutions/articles/14000043562-how-do-i-enable-the-channel-presence-feature-/) for your keyset.

1. [Enable the Storage and Playback feature](https://support.pubnub.com/support/solutions/articles/14000043644-how-do-i-enable-the-message-history-feature-) for your keyset.

1. [Enable the Stream Controller feature](https://support.pubnub.com/support/solutions/articles/14000043662-how-do-i-enable-wildcard-subscribe-for-my-pubnub-keys-) for your keyset.

1. Copy the Publish and Subscribe keys for the next step.

## Building and Running

1. You'll need to run the following commands from your terminal.

1. Clone the GitHub repository.

    ```bash
    git clone https://github.com/PubNubDevelopers/chat-component-app-simple.git
    ```

1. Navigate into the repository.

    ```bash
    cd chat-component-app-simple
    ```

1. Open src/config/pubnub-keys.json. **Replace YOUR_PUBLISH_KEY_HERE and YOUR_SUBSCRIBE_KEY_HERE** with your keyset from your [PubNub Dashboard](https://dashboard.pubnub.com/).

1. Install the node modules.

    ```bash
    npm install
    ```

1. Run the project in your local environment.

    ```bash
    npm start
    ```

    **A web browser should automatically open and you can start chatting!** If it doesn't open try navigating to http://localhost:8080/


## Further Information

Checkout [PubNub Chat Docs](https://www.pubnub.com/docs/chat) page for more information about how to use the React and Redux SDKs to add in-app chat to your applications.



