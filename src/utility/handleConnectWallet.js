export const handleConnectWallet = (walletAddress) => {
    if (!walletAddress) return <span className='italic'>No Wallet Connected!</span>

        // Else return the address of the connected wallet
        return  <span className='bold'>Wallet: {walletAddress}</span>;
}