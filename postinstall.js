const githubLink = 'https://github.com/HansUXdev/hello-tello';
const medium = 'http://bit.ly/2R9QPOa';
const postinstallInfo = 'https://stackoverflow.com/questions/23505318/npm-disable-postinstall-script-for-package/23506053';

const BANNER = `\u001B[96m Thank you for using hello-tello (\u001B[94m${githubLink}\u001B[96m) for communicating with a tello drone using JavaScript !\u001B[0m\n\n`

+`\u001B[96m You can read more about on medium by following the author (\u001B[94m${medium}\u001B[96m). \n Also he is looking for a good job where he can work from home and take care of his baby boy. \u001B[0m\n`

+`\n\u001B[96m P.S. This message is only available via a post install script. You should consider looking into disabling post-install scripts (\u001B[94m${postinstallInfo}\u001B[96m) because for all you know, this could have been malware with full read/write permissions...
    
    Thankfully, it is not... \u001B[0m\n`;

    console.log(BANNER);
    