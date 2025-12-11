// "use client";

// import { useAccount } from "wagmi";

// export default function Home() {
//   const { address, isConnected } = useAccount();

//   return (
//     <div style={{ padding: 30 }}>
//       <h1 style={{ fontSize: 24, marginBottom: 20 }}>
//         Next.js Web3 Wallet Connect
//       </h1>

//       {/* WalletConnect Button */}
//       <w3m-button />

//       <div style={{ marginTop: 20 }}>
//         {isConnected ? (
//           <>
//             <p>Connected Wallet:</p>
//             <b>{address}</b>
//           </>
//         ) : (
//           <p>No Wallet Connected</p>
//         )}
//       </div>
//     </div>
//   );
// }
