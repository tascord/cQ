const _ = new Form('CactiveClient — Beta Tester Application', 'CactiveNetwork')

    .addQuestion(`Do you meet the following requirements?`, `
        You must not be in any agreement / working with other Minecraft clients.
        You must have a working microphone and be able to join voice channels.1
        You must have a valid Java Minecraft account, purchased at https://minecraft.net.
        Your system must be able to run Java, downloadable at https://www.java.com/.
        You must have 1+ years experience playing Minecraft and know basic game mechanics.
        You must be and stay in the CactiveNetwork discord; https://discord.gg/NeqVuSy.
    `, new Button('I am eligible and meet the required criteria.'), true)
    
    .addQuestion(`Please state your Discord username and tag.`, `We need this information to identify who is applying.`, new Text(undefined, /^(@|).+?#[0-9]{4}$/), true)

    .addQuestion(`What operating system are you using?`, `What type of computer system are you running on the computer you tend to play on?`, [
        new Radio(`Windows`),
        new Radio(`macOS`),
        new Radio(`*nix`),
        new Radio(`Other`)
    ], true)

    .addQuestion(`How much RAM will you allocate to your game?`, `This is not about how much RAM you have available on your computer, but how much you are willing to allocate to the client. We recommend at least 8GB+ RAM for your system at ~3GB RAM for your game.`, new Range(1, 8, 1, 1, 'GB'), true)

    // .addQuestion