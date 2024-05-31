# SpeedRun Particle

![image](https://github.com/gugasanchez/SpeedRun-Particle/assets/62973287/bb7b4dfa-2590-4aad-b4c8-2cff184b87e4)


👋 Welcome to SpeedRun Particle! This tutorial is designed for both beginners and experienced Web3 developers. Whether you are just starting out or looking to enhance your skills, this challenge will help you integrate Particle Auth into your applications.

✨ Particle Auth simplifies user authentication in Web3 apps. With support for social logins like Google and Twitter, it makes sign-ins easy and secure, improving user experience and accessibility.

## 🛠️ In this tutorial, you will:

1. Set up your development environment.
2. Configure Particle Auth for social logins.
3. Integrate Particle Auth into Scaffold ETH 2 project.
4. Create a simple smart contract.
5. Develop a frontend for user login and blockchain interaction.

🚀 By the end, you'll have a functional app with Particle Auth and blockchain interactions. Let's get started!

## Table of Contents

1. [Checkpoint 0: 📦 Setting Up the Environment 📚](#checkpoint-0)
2. [Checkpoint 1: Introduction to Scaffold ETH](#checkpoint-1)
3. [Checkpoint 2: Create Connectors for Particle Wallet](#checkpoint-2)
4. [Checkpoint 3: Modify the Connect Button](#checkpoint-3)
5. [Checkpoint 4: Create a Particle Network Project](#checkpoint-4)
6. [Checkpoint 5: Deploy the YourContract on Sepolia](#checkpoint-5)
7. [Checkpoint 6: Interact with YourContract Using Particle Social Wallet](#checkpoint-6)
8. [Checkpoint 7: Ship Your Frontend](#checkpoint-7)

---

## Checkpoint 0: 📦 Setting Up the Environment 📚

Welcome to Checkpoint 0! Before we dive into the development, we need to set up the environment. Follow these steps to get your environment ready for building the SpeedRun Particle project.

First, ensure you have Node.js and Yarn installed on your system. If you haven't installed them yet, you can download and install them from the following links:

- [Node.js](https://nodejs.org/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/)
- [Git](https://git-scm.com/)

Next, clone the starting repository for this tutorial. Open your terminal and run:

```bash
git clone https://github.com/gugasanchez/SpeedRun-Particle
cd SpeedRun-Particle
yarn install
```

In the same terminal, start your local network (a local instance of a blockchain):

```bash
yarn chain
```

in a second terminal window, 🛰 deploy your contract (locally):

```bash
cd SpeedRun-Particle
yarn deploy
```

in a third terminal window, start your 📱 frontend:

```bash
cd SpeedRun-Particle
yarn start
```

📱 Open http://localhost:3000 to see the app.

### Checkpoint 1: Introduction to Scaffold ETH

In this step, we will check the initial setup by interacting with the application:

1. **Connect Burner Wallet**: On the frontend, connect the burner wallet that comes with Scaffold ETH 2 (it will probably be already connected for you).
2. **Fund the Wallet**: Since the application is running on the Hardhat network, fund the wallet using the faucet button in the top right of the application.
4. **Send a Greeting**: Navigate to the "Debug Contracts" page and send a new greeting with the message "Starting SpeedRun Particle" and a value of `0.1 ETH` (100000000000000000 wei).

By completing these steps, you will ensure that your environment is correctly set up and ready for the upcoming checkpoints.

### Checkpoint 2: Create Connectors for Particle Wallet

In this checkpoint, we will start the development process by creating connectors for Particle Wallet. The goal is to integrate Particle Wallet into your Scaffold ETH 2 project and make it available for use in your application.

#### Step 1: Create the Particle Wallet Services

We will create two new files in the `services` directory of your project. These files will handle the integration of Particle Wallet and its connectors.

First, navigate to `packages/nextjs/services/particleWallet/` and create an `index.ts` file with the following content:

```typescript
import type { Wallet, WalletDetailsParams } from '@rainbow-me/rainbowkit';
import { createConnector } from 'wagmi';
import { googleIcon, particleIcon, twitterIcon } from './icons';
import { particleWagmiWallet } from './particleWagmiWallet';

// Create a connector for Particle Wallet
export const particleWallet = (): Wallet => ({
    id: 'particle',
    name: 'Particle Wallet',
    iconUrl: async () => particleIcon,
    iconBackground: '#fff',
    installed: true,
    createConnector: (walletDetails: WalletDetailsParams) =>
        createConnector(
            (config) =>
                ({
                    ...particleWagmiWallet()(config),
                    ...walletDetails,
                } as any)
        ),
});

// Create a connector for Google using Particle Wallet
export const particleGoogleWallet = (): Wallet => ({
    id: 'particle_google',
    name: 'Google',
    iconUrl: async () => googleIcon,
    iconBackground: '#fff',
    installed: true,
    createConnector: (walletDetails: WalletDetailsParams) =>
        createConnector(
            (config) =>
                ({
                    ...particleWagmiWallet({ socialType: 'google' })(config),
                    ...walletDetails,
                } as any)
        ),
});

// Create a connector for Twitter using Particle Wallet
export const particleTwitterWallet = (): Wallet => ({
    id: 'particle_twitter',
    name: 'Twitter',
    iconUrl: async () => twitterIcon,
    iconBackground: '#fff',
    installed: true,
    createConnector: (walletDetails: WalletDetailsParams) =>
        createConnector(
            (config) =>
                ({
                    ...particleWagmiWallet({ socialType: 'twitter' })(config),
                    ...walletDetails,
                } as any)
        ),
});

```

In the same directory, create an `icons.ts` file with the following content:

```typescript
export const particleIcon =
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjkiIGhlaWdodD0iMjkiIHZpZXdCb3g9IjAgMCAyOSAyOSI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImxpbmVhci1ncmFkaWVudCIgeDE9IjEiIHkxPSIwLjUiIHgyPSIwIiB5Mj0iMC41IiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzg2NGRlYiIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjAuNTAyIiBzdG9wLWNvbG9yPSIjZTY0YmUwIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZkNGJkZCIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPGcgaWQ9Iue7hF8xMjI3IiBkYXRhLW5hbWU9Iue7hCAxMjI3IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzIwIC01MzcpIj4KICAgIDxyZWN0IGlkPSLnn6nlvaJfNDAwIiBkYXRhLW5hbWU9IuefqeW9oiA0MDAiIHdpZHRoPSIyOSIgaGVpZ2h0PSIyOSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzIwIDUzNykiIGZpbGw9InVybCgjbGluZWFyLWdyYWRpZW50KSIvPgogICAgPHBhdGggaWQ9IuakreWchl8zX+aLt+i0nSIgZGF0YS1uYW1lPSLmpK3lnIYgMyDmi7fotJ0iIGQ9Ik0xNjU2LjE4OCwyODAuNzdhMS41MjYsMS41MjYsMCwxLDAsMS41MDcsMS41MjZBMS41MjUsMS41MjUsMCwwLDAsMTY1Ni4xODgsMjgwLjc3Wm0zLjExNC0xLjgxMWExLjUsMS41LDAsMCwwLTEuOS45OCwxLjUzLDEuNTMsMCwwLDAsLjk2OCwxLjkyMywxLjUsMS41LDAsMCwwLDEuOS0uOTgsMS41MywxLjUzLDAsMCwwLS45NjktMS45MjJabTMuNTE2LS43NDhhMS40OTQsMS40OTQsMCwwLDAtMi4xLjMzOCwxLjUzOCwxLjUzOCwwLDAsMCwuMzMzLDIuMTMyLDEuNDk1LDEuNDk1LDAsMCwwLDIuMS0uMzM4LDEuNTM5LDEuNTM5LDAsMCwwLS4zMzMtMi4xMzFabTMuNTcxLjM4OWExLjQ5NCwxLjQ5NCwwLDAsMC0yLjEtLjMzNywxLjUzNywxLjUzNywwLDAsMC0uMzMzLDIuMTMyLDEuNDk0LDEuNDk0LDAsMCwwLDIuMS4zMzgsMS41MzksMS41MzksMCwwLDAsLjMzMy0yLjEzM1ptMy4yNzgsMS40ODhhMS41LDEuNSwwLDAsMC0xLjktLjk4LDEuNTI5LDEuNTI5LDAsMCwwLS45NjcsMS45MjMsMS41LDEuNSwwLDAsMCwxLjkuOTgsMS41MywxLjUzLDAsMCwwLC45NjctMS45MjNabTIuNjY0LDIuNDRhMS41MDcsMS41MDcsMCwxLDAtLjQzNCwxLjA3NywxLjUwNywxLjUwNywwLDAsMCwuNDM0LTEuMDc3Wm0xLjc4OSwzLjE1NGExLjUzLDEuNTMsMCwwLDAtLjk2OC0xLjkyMywxLjUsMS41LDAsMCwwLTEuOS45OCwxLjUzMSwxLjUzMSwwLDAsMCwuOTY4LDEuOTIzLDEuNSwxLjUsMCwwLDAsMS45LS45OFptLjczOCwzLjU1OWExLjUzNywxLjUzNywwLDAsMC0uMzMzLTIuMTMyLDEuNDk1LDEuNDk1LDAsMCwwLTIuMS4zMzgsMS41NCwxLjU0LDAsMCwwLC4zMzMsMi4xMzIsMS40OTUsMS40OTUsMCwwLDAsMi4xMDUtLjMzOFptLS4zODMsMy42MTZhMS41NCwxLjU0LDAsMCwwLC4zMzMtMi4xMzIsMS40OTQsMS40OTQsMCwwLDAtMi4xLS4zMzgsMS41MzcsMS41MzcsMCwwLDAtLjMzMywyLjEzMiwxLjQ5NSwxLjQ5NSwwLDAsMCwyLjEwNS4zMzhabS0xLjQ2OSwzLjMxOWExLjUzLDEuNTMsMCwwLDAsLjk2Ny0xLjkyMywxLjUsMS41LDAsMCwwLTEuOS0uOTgsMS41MywxLjUzLDAsMCwwLS45NjcsMS45MjMsMS41LDEuNSwwLDAsMCwxLjkuOThabS0yLjQwOSwyLjdhMS41MjYsMS41MjYsMCwxLDAtMS41MDYtMS41MjYsMS41MjUsMS41MjUsMCwwLDAsMS41MDYsMS41MjZabS0zLjExNCwxLjgxMWExLjUsMS41LDAsMCwwLDEuOS0uOTgsMS41MywxLjUzLDAsMCwwLS45NjgtMS45MjMsMS41LDEuNSwwLDAsMC0xLjkuOTgsMS41MywxLjUzLDAsMCwwLC45NjgsMS45MjNabS0zLjUxNi43NDhhMS41LDEuNSwwLDAsMCwyLjEwNi0uMzM4LDEuNTM4LDEuNTM4LDAsMCwwLS4zMzQtMi4xMzIsMS40OTUsMS40OTUsMCwwLDAtMi4xLjMzOCwxLjU0LDEuNTQsMCwwLDAsLjMzMywyLjEzMlptLTMuNTcxLS4zODlhMS40OTUsMS40OTUsMCwwLDAsMi4xLjMzOCwxLjUzOCwxLjUzOCwwLDAsMCwuMzM0LTIuMTMyLDEuNSwxLjUsMCwwLDAtMi4xMDYtLjMzOCwxLjUzOSwxLjUzOSwwLDAsMC0uMzMzLDIuMTMyWm0tMy4yNzgtMS40ODhhMS41LDEuNSwwLDAsMCwxLjkuOTgsMS41MywxLjUzLDAsMCwwLC45NjctMS45MjMsMS41LDEuNSwwLDAsMC0xLjktLjk4LDEuNTMxLDEuNTMxLDAsMCwwLS45NjcsMS45MjNabS0yLjY2NC0yLjQ0YTEuNTA4LDEuNTA4LDAsMSwwLC40MzUtMS4wNzhBMS41MDcsMS41MDcsMCwwLDAsMTY1NC40NTUsMjk3LjExNVptNC4zMjUtMTIuOTg4YS45MTYuOTE2LDAsMSwwLC45LjkxNkEuOTE1LjkxNSwwLDAsMCwxNjU4Ljc4MSwyODQuMTI3Wm0xLjkyNi0xLjE3M2EuOS45LDAsMCwwLTEuMTQuNTg4LjkxOS45MTksMCwwLDAsLjU4MSwxLjE1NC45LjksMCwwLDAsMS4xNC0uNTg4LjkxOS45MTksMCwwLDAtLjU4My0xLjE1NFptMi4xOS0uNTE0YS45LjksMCwwLDAtMS4yNjQuMi45MjMuOTIzLDAsMCwwLC4yLDEuMjc5LjkuOSwwLDAsMCwxLjI2My0uMi45MjMuOTIzLDAsMCwwLS4yLTEuMjc5Wm0yLjIzOS4yYS45LjksMCwwLDAtMS4yNjMtLjIuOTIzLjkyMywwLDAsMC0uMiwxLjI3OS45LjksMCwwLDAsMS4yNjMuMi45MjMuOTIzLDAsMCwwLC4yLTEuMjc5Wm0yLjA2OS44ODdhLjkuOSwwLDAsMC0xLjEzOS0uNTg4LjkxOS45MTksMCwwLDAtLjU4MSwxLjE1NC45LjksMCwwLDAsMS4xNC41ODguOTE3LjkxNywwLDAsMCwuNTgtMS4xNTRabTEuNywxLjQ5MWEuOTA5LjkwOSwwLDEsMC0uMjYyLjY0NS45MDkuOTA5LDAsMCwwLC4yNjItLjY0NVptMS4xNiwxLjk0OWEuOTE3LjkxNywwLDAsMC0uNTgtMS4xNTQuOS45LDAsMCwwLTEuMTQuNTg4LjkxNy45MTcsMCwwLDAsLjU4MSwxLjE1NC45LjksMCwwLDAsMS4xMzktLjU4OFptLjUwOCwyLjIxN2EuOTIzLjkyMywwLDAsMC0uMi0xLjI3OS45LjksMCwwLDAtMS4yNjMuMi45MjMuOTIzLDAsMCwwLC4yLDEuMjc5LjkuOSwwLDAsMCwxLjI2My0uMlptLS4xOTQsMi4yNjdhLjkyMy45MjMsMCwwLDAsLjItMS4yNzkuOS45LDAsMCwwLTEuMjY0LS4yLjkyMy45MjMsMCwwLDAtLjIsMS4yNzkuOS45LDAsMCwwLDEuMjYzLjJabS0uODc2LDIuMWEuOTE5LjkxOSwwLDAsMCwuNTgxLTEuMTU0LjkuOSwwLDAsMC0xLjE0LS41ODguOTE5LjkxOSwwLDAsMC0uNTgxLDEuMTU0LjkuOSwwLDAsMCwxLjE0LjU4OFptLTEuNDczLDEuNzE5YS45MTYuOTE2LDAsMSwwLS45LS45MTUuOTE1LjkxNSwwLDAsMCwuOS45MTVabS0xLjkyNiwxLjE3M2EuOS45LDAsMCwwLDEuMTQtLjU4OC45MTkuOTE5LDAsMCwwLS41ODEtMS4xNTQuOS45LDAsMCwwLTEuMTM5LjU4OC45MTcuOTE3LDAsMCwwLC41OCwxLjE1NFptLTIuMTg5LjUxNGEuOS45LDAsMCwwLDEuMjYzLS4yLjkyMy45MjMsMCwwLDAtLjItMS4yNzkuOS45LDAsMCwwLTEuMjYzLjIuOTIzLjkyMywwLDAsMCwuMiwxLjI3OVptLTIuMjQtLjJhLjkuOSwwLDAsMCwxLjI2NC4yLjkyMy45MjMsMCwwLDAsLjItMS4yNzkuOS45LDAsMCwwLTEuMjYzLS4yQS45MjMuOTIzLDAsMCwwLDE2NjEuNjcyLDI5Ni43NTRabS0yLjA2OS0uODg3YS45LjksMCwwLDAsMS4xMzkuNTg4LjkxNy45MTcsMCwwLDAsLjU4MS0xLjE1NC45LjksMCwwLDAtMS4xNC0uNTg4LjkxNy45MTcsMCwwLDAtLjU4LDEuMTU0Wm0tMS43LTEuNDkxYS45LjksMCwxLDAsLjI2MS0uNjQ3QS45LjksMCwwLDAsMTY1Ny45MDYsMjk0LjM3NVptMi41NjMtNy43NDZhLjQ4OC40ODgsMCwxLDAsLjQ4Mi40ODhBLjQ4OC40ODgsMCwwLDAsMTY2MC40NjksMjg2LjYyOVptMS4wNDctLjY0N2EuNDgxLjQ4MSwwLDAsMC0uNjA4LjMxMy40ODkuNDg5LDAsMCwwLC4zMS42MTUuNDgxLjQ4MSwwLDAsMCwuNjA3LS4zMTQuNDkuNDksMCwwLDAtLjMxLS42MTVabTEuMTkzLS4yODhhLjQ3OS40NzksMCwwLDAtLjY3NC4xMDguNDkzLjQ5MywwLDAsMCwuMTA2LjY4Mi40NzkuNDc5LDAsMCwwLC42NzQtLjEwOC40OTEuNDkxLDAsMCwwLS4xMDYtLjY4MlptMS4yMjIuMWEuNDc4LjQ3OCwwLDAsMC0uNjczLS4xMDguNDkzLjQ5MywwLDAsMC0uMTA3LjY4Mi40NzkuNDc5LDAsMCwwLC42NzQuMTA4LjQ5MS40OTEsMCwwLDAsLjEwNi0uNjgzWm0xLjEzMi40NzZhLjQ4LjQ4LDAsMCwwLS42MDctLjMxNC40ODkuNDg5LDAsMCwwLS4zMDkuNjE1LjQ4LjQ4LDAsMCwwLC42MDcuMzE0LjQ4OS40ODksMCwwLDAsLjMwOS0uNjE2Wm0uOTMyLjgwOGEuNDg1LjQ4NSwwLDEsMC0uMTQuMzQ0LjQ4NS40ODUsMCwwLDAsLjE0LS4zNDRabS42NCwxLjA2YS40OS40OSwwLDAsMC0uMzEtLjYxNS40OC40OCwwLDAsMC0uNjA3LjMxNC40OS40OSwwLDAsMCwuMzEuNjE1LjQ4MS40ODEsMCwwLDAsLjYwNy0uMzE0Wm0uMjg0LDEuMjA4YS40OTMuNDkzLDAsMCwwLS4xMDYtLjY4Mi40NzkuNDc5LDAsMCwwLS42NzQuMTA4LjQ5Mi40OTIsMCwwLDAsLjEwNi42ODIuNDc5LjQ3OSwwLDAsMCwuNjc0LS4xMDhabS0uMSwxLjIzN2EuNDkyLjQ5MiwwLDAsMCwuMTA2LS42ODIuNDc5LjQ3OSwwLDAsMC0uNjc0LS4xMDguNDkyLjQ5MiwwLDAsMC0uMTA2LjY4Mi40NzkuNDc5LDAsMCwwLC42NzQuMTA4Wm0tLjQ3MSwxLjE0N2EuNDkuNDksMCwwLDAsLjMxLS42MTUuNDgxLjQ4MSwwLDAsMC0uNjA4LS4zMTQuNDkuNDksMCwwLDAtLjMxLjYxNS40ODEuNDgxLDAsMCwwLC42MDguMzEzWm0tLjguOTQzYS40ODguNDg4LDAsMSwwLS40ODItLjQ4OEEuNDg4LjQ4OCwwLDAsMCwxNjY1LjU1MiwyOTIuNjcyWm0tMS4wNDcuNjQ3YS40ODEuNDgxLDAsMCwwLC42MDgtLjMxNC40OS40OSwwLDAsMC0uMzEtLjYxNS40ODEuNDgxLDAsMCwwLS42MDguMzE0LjQ5LjQ5LDAsMCwwLC4zMS42MTVabS0xLjE5My4yODhhLjQ3OS40NzksMCwwLDAsLjY3NC0uMTA4LjQ5My40OTMsMCwwLDAtLjEwNy0uNjgyLjQ3OC40NzgsMCwwLDAtLjY3My4xMDguNDkxLjQ5MSwwLDAsMCwuMTA2LjY4MlptLTEuMjIyLS4xYS40NzcuNDc3LDAsMCwwLC42NzMuMTA4LjQ5My40OTMsMCwwLDAsLjEwNy0uNjgyLjQ3OS40NzksMCwwLDAtLjY3NC0uMTA4LjQ5MS40OTEsMCwwLDAtLjEwNi42ODJabS0xLjEzMy0uNDc2YS40ODIuNDgyLDAsMCwwLC42MDkuMzE0LjQ4OS40ODksMCwwLDAsLjMwOS0uNjE1LjQ4MS40ODEsMCwwLDAtLjYwOC0uMzE0QS40OS40OSwwLDAsMCwxNjYwLjk1OCwyOTMuMDMyWm0tLjkzMi0uODA4YS40ODUuNDg1LDAsMSwwLC4xNC0uMzQ0QS40ODUuNDg1LDAsMCwwLDE2NjAuMDI1LDI5Mi4yMjVaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTMzMC4wMjcgMjYxLjY4MSkiIGZpbGw9IiNmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPgogIDwvZz4KPC9zdmc+Cg==';

export const googleIcon =
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOSIgaGVpZ2h0PSIyOSIgdmlld0JveD0iMCAwIDI5IDI5Ij4KICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAgLmNscy0xIHsKICAgICAgICBmaWxsOiAjZmZmOwogICAgICB9CgogICAgICAuY2xzLTIgewogICAgICAgIGZpbGw6ICNmYmJjMDU7CiAgICAgIH0KCiAgICAgIC5jbHMtMyB7CiAgICAgICAgZmlsbDogI2VhNDMzNTsKICAgICAgfQoKICAgICAgLmNscy00IHsKICAgICAgICBmaWxsOiAjMzRhODUzOwogICAgICB9CgogICAgICAuY2xzLTUgewogICAgICAgIGZpbGw6ICM0Mjg1ZjQ7CiAgICAgIH0KICAgIDwvc3R5bGU+CiAgPC9kZWZzPgogIDxnIGlkPSLnu4RfMTEzNiIgZGF0YS1uYW1lPSLnu4QgMTEzNiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTMyMCAtNTM3KSI+CiAgICA8cmVjdCBpZD0i55+p5b2iXzQwMCIgZGF0YS1uYW1lPSLnn6nlvaIgNDAwIiBjbGFzcz0iY2xzLTEiIHdpZHRoPSIyOSIgaGVpZ2h0PSIyOSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzIwIDUzNykiLz4KICAgIDxwYXRoIGlkPSLot6/lvoRfMTY3MCIgZGF0YS1uYW1lPSLot6/lvoQgMTY3MCIgY2xhc3M9ImNscy0yIiBkPSJNOS4xMiwyOTQuOTA4YTYuMTU4LDYuMTU4LDAsMCwxLC4zMjUtMS45NjVMNS44LDI5MC4yMTlhMTAuNDYzLDEwLjQ2MywwLDAsMCwwLDkuMzc0bDMuNjQxLTIuNzI5YTYuMTQzLDYuMTQzLDAsMCwxLS4zMjEtMS45NTciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMxOS4yMjYgMjU2LjU4OSkiLz4KICAgIDxwYXRoIGlkPSLot6/lvoRfMTY3MSIgZGF0YS1uYW1lPSLot6/lvoQgMTY3MSIgY2xhc3M9ImNscy0zIiBkPSJNNjYuODg5LDE1LjcyMmE2LjM0NCw2LjM0NCwwLDAsMSwzLjk4NSwxLjM5NWwzLjE0OS0zLjA3OWExMC45NDgsMTAuOTQ4LDAsMCwwLTE2Ljg0OSwzLjI0OWwzLjY0NCwyLjcyNGE2LjM2Niw2LjM2NiwwLDAsMSw2LjA3MS00LjI4OSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjY3Ljg1NSA1MjkuNTIpIi8+CiAgICA8cGF0aCBpZD0i6Lev5b6EXzE2NzIiIGRhdGEtbmFtZT0i6Lev5b6EIDE2NzIiIGNsYXNzPSJjbHMtNCIgZD0iTTY2Ljg4OSw2MDkuMjE3YTYuMzY5LDYuMzY5LDAsMCwxLTYuMDczLTQuMjg5bC0zLjY0MywyLjcyNGExMC44MTYsMTAuODE2LDAsMCwwLDkuNzE1LDUuOSwxMC40NDEsMTAuNDQxLDAsMCwwLDcuMDUyLTIuNjM4bC0zLjQ1OS0yLjYxOGE2LjgsNi44LDAsMCwxLTMuNTk1LjkyNiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjY3Ljg1NSAtNTEuNDY3KSIvPgogICAgPHBhdGggaWQ9Iui3r+W+hF8xNjczIiBkYXRhLW5hbWU9Iui3r+W+hCAxNjczIiBjbGFzcz0iY2xzLTUiIGQ9Ik01MjYuOTg0LDQyMi45MTZhOC42Miw4LjYyLDAsMCwwLS4yNDYtMS45MjRINTE2LjY1MXY0LjA4OWg1LjgwNmE0Ljc2Myw0Ljc2MywwLDAsMS0yLjIxLDMuMTY0bDMuNDU4LDIuNjE4YTEwLjQxOCwxMC40MTgsMCwwLDAsMy4yOC03Ljk0NiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4MS45MDggMTI4LjU4KSIvPgogIDwvZz4KPC9zdmc+Cg==';

export const twitterIcon =
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOSIgaGVpZ2h0PSIyOSIgdmlld0JveD0iMCAwIDI5IDI5Ij4KICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAgLmNscy0xIHsKICAgICAgICBmaWxsOiAjZmZmOwogICAgICB9CgogICAgICAuY2xzLTIgewogICAgICAgIGZpbGw6ICMxZGExZjI7CiAgICAgIH0KICAgIDwvc3R5bGU+CiAgPC9kZWZzPgogIDxnIGlkPSLnu4RfMTIwNyIgZGF0YS1uYW1lPSLnu4QgMTIwNyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTMyMCAtNTM3KSI+CiAgICA8cmVjdCBpZD0i55+p5b2iXzQwMCIgZGF0YS1uYW1lPSLnn6nlvaIgNDAwIiBjbGFzcz0iY2xzLTEiIHdpZHRoPSIyOSIgaGVpZ2h0PSIyOSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzIwIDUzNykiLz4KICAgIDxwYXRoIGlkPSJ0d2l0dGVyIiBjbGFzcz0iY2xzLTIiIGQ9Ik0xMTQuMTQ1LDE3NS43NjFhNy41LDcuNSwwLDAsMS0yLjE1My41NzksMy43MywzLjczLDAsMCwwLDEuNjQ0LTIuMDYxLDcuMzgyLDcuMzgyLDAsMCwxLTIuMzcyLjksMy43NDIsMy43NDIsMCwwLDAtNi40NzEsMi41NTksNC4yOTQsNC4yOTQsMCwwLDAsLjA5Mi44NTcsMTAuNjI1LDEwLjYyNSwwLDAsMS03LjcwOS0zLjkxNCwzLjc1LDMuNzUsMCwwLDAsMS4xNTgsNSwzLjc3MSwzLjc3MSwwLDAsMS0xLjY5MS0uNDc2di4wNDZhMy43NCwzLjc0LDAsMCwwLDMsMy42NywzLjk2MSwzLjk2MSwwLDAsMS0uOTg0LjEyN0E0Ljk3NSw0Ljk3NSwwLDAsMSw5Ny45NSwxODNhMy43NDYsMy43NDYsMCwwLDAsMy41LDIuNTk0LDcuNDkzLDcuNDkzLDAsMCwxLTQuNjQyLDEuNiw3LjY0NCw3LjY0NCwwLDAsMS0uOS0uMDQ2LDEwLjY0NSwxMC42NDUsMCwwLDAsMTYuMzgxLTguOTY0YzAtLjE2MiwwLS4zMjQtLjAxMS0uNDg3QTguMDUyLDguMDUyLDAsMCwwLDExNC4xNDUsMTc1Ljc2MVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIyOS42MTIgMzcwLjA4OSkiLz4KICA8L2c+Cjwvc3ZnPgo=';
```

Next, we will add the Particle Wallet connectors to the `wagmiConnectors.tsx` file. This will allow the Particle Wallet options to be available in the wallet connection options.

Open the file `packages/nextjs/services/web3/wagmiConnectors.tsx` and modify it to include the Particle Wallet connectors:

```typescript
import { particleGoogleWallet, particleTwitterWallet, particleWallet } from "../particleWallet/index";
```

```typescript
    {
      groupName: "Social Wallets",
      wallets: [particleGoogleWallet, particleTwitterWallet, particleWallet],
    },
```


### Checkpoint 3: Modify the Connect Button

In this checkpoint, we will modify the Connect Button to handle connections with Particle Wallets. This will enable the RainbowKit to display correctly the Particle Wallets.

Navigate to `packages/nextjs/components/particle/` and create a new file named `ParticleConnectionHandler.tsx` with the following content:

```typescript
"use client";

import React, { useEffect } from "react";
import {
  AuthCoreEvent,
  type SocialAuthType,
  getLatestAuthType,
  isSocialAuthType,
  particleAuth,
} from "@particle-network/auth-core";
import { useConnect as useParticleConnect } from "@particle-network/auth-core-modal";
import { useConnect, useDisconnect } from "wagmi";
import { particleWagmiWallet } from "~~/services/particleWallet/particleWagmiWallet";

const ParticleConnectionHandler = ({ openConnectModal }: { openConnectModal: () => void }) => {
  const { connect } = useConnect();
  const { connectionStatus } = useParticleConnect();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (connectionStatus === "connected" && isSocialAuthType(getLatestAuthType())) {
      connect({
        connector: particleWagmiWallet({ socialType: getLatestAuthType() as SocialAuthType }),
      });
    }
    const onDisconnect = () => disconnect();
    particleAuth.on(AuthCoreEvent.ParticleAuthDisconnect, onDisconnect);
    return () => particleAuth.off(AuthCoreEvent.ParticleAuthDisconnect, onDisconnect);
  }, [connect, connectionStatus, disconnect]);

  return (
    <button className="btn btn-primary btn-sm" onClick={openConnectModal} type="button">
      Connect Wallet
    </button>
  );
};

export default ParticleConnectionHandler;
```

Then, modify the existing Connect Button to use the new Particle Connection Handler.

First, open the file `packages/nextjs/components/scaffold-eth/RainbowKitCustomConnectButton/index.tsx` and add the import:

```typescript
import ParticleConnectionHandler from "~~/components/particle/ParticleConnectionHandler";
```

Next change the `!connected` case to include the new connection button:

```typescript
  if (!connected) {
    return <ParticleConnectionHandler openConnectModal={openConnectModal} />;
  }
```

### Checkpoint 4: Create a Particle Network Project

In this checkpoint, we will create a Particle Network project to obtain the projectId, clientKey, and appId. These keys are essential for integrating Particle Auth into your application.


Go to the [Particle Network](https://particle.network) website, press the **"Dashboard"** button in the top right, and sign up for an account if you don't already have one. If you already have an account, simply log in.

After logging in, navigate to the **"All Projects"** section from the dashboard.

Click on the **"Add New Project"** button and follow the instructions to set up a new project.

<img width="1710" alt="image" src="https://github.com/gugasanchez/SpeedRun-Particle/assets/62973287/10890abd-40bf-4cab-ae4d-a8e63191bed1">




After creating the project, go to the project settings to find the Project ID, Client Key, and App ID (for the App ID, you can use a mock Url like *com.company.name* if your application still doesn't have one).




<img width="1710" alt="image" src="https://github.com/gugasanchez/SpeedRun-Particle/assets/62973287/1f8b9bb1-3334-448b-a0ef-ab2cc82c07f6">



Copy the projectId, clientKey, and appId from the settings page. We will use these keys in our application.


In your project's root directory (`packages/nextjs`), create a new file named `.env` if it doesn't already exist, and add the copied keys to the `.env` file in the following format:

 ```env
 NEXT_PUBLIC_PROJECT_ID="your_project_id_here"
 NEXT_PUBLIC_CLIENT_KEY="your_client_key_here"
 NEXT_PUBLIC_APP_ID="your_app_id_here"
 ```

At last, open `packages/nextjs/components/ScaffoldEthAppWithProviders.tsx` and update it to include the `AuthCoreContextProvider` with the keys from the `.env` file.

```typescript
import { AuthCoreContextProvider } from "@particle-network/auth-core-modal";
```

 ```typescript
    <AuthCoreContextProvider
      options={{
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
        clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY as string,
        appId: process.env.NEXT_PUBLIC_APP_ID as string,
        customStyle: {
          zIndex: 2147483650, // must greater than 2147483646
        },
      }}
    >
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <ProgressBar />
          <RainbowKitProvider
            avatar={BlockieAvatar}
            theme={mounted ? (isDarkMode ? darkTheme() : lightTheme()) : lightTheme()}
          >
            <ScaffoldEthApp>{children}</ScaffoldEthApp>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </AuthCoreContextProvider>
 ```

### Checkpoint 5: Deploy the YourContract on Sepolia

In this checkpoint, we will deploy the `YourContract` smart contract to the Sepolia testnet.

Open `packages/nextjs/scaffold.config.ts` and update the `targetNetworks` to include only the Sepolia network.

 ```typescript
   // The networks on which your DApp is live
   targetNetworks: [chains.sepolia],
 ```

Change the *defaultNetwork* in `packages/hardhat/hardhat.config.ts` to Sepolia.

<img width="690" alt="image" src="https://github.com/gugasanchez/SpeedRun-Particle/assets/62973287/8d2dd002-0642-4114-bc84-2266d6a1fd3c">

🔐 Generate a deployer address with `yarn generate`. This creates a unique deployer address and saves the mnemonic locally.

This local account will deploy your contracts, allowing you to avoid entering a personal private key.

👩‍🚀 Use `yarn account` to view your deployer account balances.

⛽️ You will need to send ETH to your deployer address with your wallet, or get it from a public faucet of your chosen network.

Some popular faucets are https://sepoliafaucet.com/ and https://www.infura.io/faucet/sepolia

💬 Hint: You can set the defaultNetwork in hardhat.config.ts to sepolia OR you can yarn deploy --network sepolia.

### Checkpoint 6: Interact with YourContract Using Particle Social Wallet

In this checkpoint, we will interact with the `YourContract` smart contract that you deployed to the Sepolia testnet. We will use the frontend of the application and the Particle Social Wallet for this interaction.

#### Step 1: Fund Your Particle Social Wallet

1. **Connect Particle Wallet**

   On the frontend, connect to the Particle Social Wallet (e.g., Google or Twitter login) that you configured earlier.

  <img width="748" alt="image" src="https://github.com/gugasanchez/SpeedRun-Particle/assets/62973287/baa47e3a-5448-4383-9ad5-433479b87172">


2. **Get Sepolia ETH**

   Ensure your connected Particle wallet has Sepolia ETH. If not, use the Sepolia faucet to get testnet ETH. Visit [Sepolia Faucet](https://faucet.sepolia.dev/) and request testnet ETH for your Particle wallet address.

  <img width="303" alt="image" src="https://github.com/gugasanchez/SpeedRun-Particle/assets/62973287/191e9fa5-7154-4e9a-9469-0996da9f2ba8">


#### Step 2: Interact with YourContract

1. **Navigate to Debug Contracts**

   In the frontend, navigate to the "Debug Contracts" page. This page allows you to interact with the smart contracts directly.

   <img width="1709" alt="image" src="https://github.com/gugasanchez/SpeedRun-Particle/assets/62973287/0d316725-757f-47cd-8fc8-56172d0a1167">

2. **Interact with YourContract**

   Find the section for `YourContract` on the Debug Contracts page. Here, you can interact with the contract's functions. Perform the following actions:

   - **Send a Greeting**: Use the input fields to send a greeting message to the contract. Enter a message like "Hello from Particle Wallet" and submit the transaction.

   - **Check the Greeting**: After sending the greeting, you can check the current greeting stored in the contract. This verifies that the interaction was successful.

#### Step 3: Verify Transactions

1. **View Transactions**

   You can view the transaction details on the Sepolia testnet explorer. Go to [Sepolia Testnet Explorer](https://sepolia.etherscan.io/) and enter your wallet address to see the transactions.

   <img width="1710" alt="image" src="https://github.com/gugasanchez/SpeedRun-Particle/assets/62973287/a964d4f5-4320-48f3-a73e-ea51ab64dff7">


2. **Check Contract State**

   Verify that the state of the contract has been updated according to your interactions. This ensures that the contract functions as expected.

By completing these steps, you have successfully interacted with your deployed `YourContract` smart contract using the Particle Social Wallet. This demonstrates the seamless integration of social login wallets in a Web3 application.

### Checkpoint 7: Ship Your Frontend
🚀 Deploy your NextJS App

```bash
yarn vercel
```

Follow the steps to deploy to Vercel. Once you log in (email, github, etc), the default options should work. It'll give you a public URL.

If you want to redeploy to the same production URL you can run `yarn vercel --prod`. If you omit the `--prod` flag it will deploy it to a preview/test URL.

⚠️ Run the automated testing function to make sure your app passes

```bash
yarn test
```

#### Configuration of Third-Party Services for Production-Grade Apps.
By default, 🏗 Scaffold-ETH 2 provides predefined API keys for popular services such as Alchemy and Etherscan. This allows you to begin developing and testing your applications more easily, avoiding the need to register for these services.
This is great to complete your SpeedRunEthereum.

For production-grade applications, it's recommended to obtain your own API keys (to prevent rate limiting issues). You can configure these at:

🔷ALCHEMY_API_KEY variable in `packages/hardhat/.env and packages/nextjs/.env.local`. You can create API keys from the Alchemy dashboard.

📃ETHERSCAN_API_KEY variable in `packages/hardhat/.env` with your generated API key. You can get your key here.

💬 Hint: It's recommended to store env's for nextjs in Vercel/system env config for live apps and use `.env.local` for local testing.


---

## Conclusion

Congratulations on completing the SpeedRun Particle tutorial! By following this guide, you've successfully integrated Particle Auth into a Scaffold ETH 2 project, enabling powerful social login capabilities. This enhancement significantly improves user experience and accessibility, demonstrating the robustness and flexibility of Scaffold ETH 2 in modern Web3 applications.

This tutorial not only equips you with the skills to integrate Particle Auth into your projects but also serves as a foundation for incorporating similar functionalities in any application using RainbowKit.

We hope you found this tutorial enriching and inspiring. This project is intended to continue with more challenges, exploring new Particle Network services and further enhancing your Web3 development skills.

A special thank you to the BuidlGuidl mentors of Batch 4 for making this project possible, Particle's Advocate Tabasco for the invaluable support, and Ryan Viana and Pedro Peres for reviewing the final version of SpeedRun Particle.

Happy building! 🚀
