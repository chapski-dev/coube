# Coube Driver App 🚚

![6, 9 01_no_alpha](https://github.com/user-attachments/assets/0ed8887b-e89c-498d-8537-84f1688b10b3)
![Uploadi![6, 9 5_no_alpha](https://github.com/user-attachments/assets/dbbbaf59-a4cf-467d-b9b7-34b1bb9fa3c9)
![6, 9 4_no_alpha](https://github.com/user-attachments/assets/53baf85a-e37e-4fe3-8190-b5efab6e91c8)
![6, 9 3_no_alpha](https://github.com/user-attachments/assets/ab02ae23-4631-436b-a76c-8cb0c3c8c396)
![6, 9 2_no_alpha](https://github.com/user-attachments/assets/d1951787-2ed4-4a3a-aa8f-5519d426fa80)
ng 6, 9 01_no_alpha.png…]()

A logistics companion app designed for drivers to manage deliveries efficiently with real-time tracking, route optimization, and seamless communication.

## Features ✨

- **Real-Time Order Tracking** 📍  
  Monitor active deliveries with live location updates using `react-native-background-geolocation`.

- **Push Notifications** 🔔  
  Instant updates for new orders, route changes, or urgent alerts via Firebase Messaging and Notifee.

- **Document Management** 📄  
  Upload and manage delivery proofs (e.g., signatures, photos) with `react-native-image-picker` and WebView integration.

- **Offline Support** 📶  
  Sync data automatically when back online using background fetch and Async Storage.

- **Multi-Language Support** 🌍  
  Built-in internationalization with `i18next` for global driver teams.

- **Secure Authentication** 🔒  
  OTP verification flow via `react-native-otp-entry`.

- **Route Optimization** 🗺️  
  Integrated mapping (Yamap) and navigation for efficient path planning.

- **Haptic Feedback** 📳  
  Enhanced UX with tactile responses for critical actions.

## Tech Stack ⚙️

- **Frontend**: React Native (v0.75.4), Zustand (state management)
- **Navigation**: React Navigation (tabs, stacks, gestures)
- **APIs**: Axios with retry logic for reliable communication
- **Styling**: Reanimated, Gesture Handler for smooth animations
- **Dev Tools**: ESLint, Prettier, Jest, TypeScript


This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
