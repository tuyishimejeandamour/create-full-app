#!/usr/bin/env node
const prompts = require('prompts');

function main() {
    const { execSync } = require('child_process');
    const path = require('path');
    const fs = require('fs');

    if (process.argv.length < 3) {
        console.clear();
        console.log('\n\n\x1b[32m%s\x1b[0m','|----------------------------------------------------|');
        console.log('\x1b[32m%s\x1b[0m','|             usage of our up                        |');
        console.log('\x1b[32m%s\x1b[0m','|----------------------------------------------------|');
        console.log('| You have to provide a name to your app.');
        console.log('| For example :','\x1b[34m%s\x1b[0m','npx create-dobby my-app');
        console.table
        console.log('\n\n')
        process.exit(1);
    }

    const projectName = process.argv[2];
    const currentPath = process.cwd();
    const projectPath = path.join(currentPath, projectName);
    const git_repo = "https://github.com/tuyishimejeandamour/project.git";


    try {
        fs.mkdirSync(projectPath);
    } catch (err) {
        if (err.code === 'EEXIST') {
            console.log('\x1b[31m%s\x1b[0m',`The file ${projectName} already exist in the current directory, please give it another name.`);
        } else {
            console.log(error);
        }
        process.exit(1);
    }

    async function main() {
        try {
            console.log('\x1b[34m%s\x1b[0m', 'Downloading files...');
            execSync(`git clone --depth 1 ${git_repo} "${projectPath}"`);
            const prompts = require('prompts');
            (async () => {
                const response = await prompts({
                    type: 'select',
                    name: 'package',
                    message: 'Pick a package manager to use: ',
                    choices: [
                        { title: 'npm', description: 'This will install package with npm', value: 'npm' },
                        { title: 'yarn', description: 'This will install package with yarn', value: 'yarn' }
                    ]
                });


                if (response["package"] === "npm") {
                    console.log('\x1b[36m%s\x1b[0m', 'Npm Installing dependencies...')
                    process.chdir(projectPath+'/frontend');  
                    execSync('npm install');
                    process.chdir(projectPath+'/backend');
                    execSync('npm install');                    
                } else if (response["package"] === "yarn") {
                    console.log('\x1b[36m%s\x1b[0m', 'Yarn Installing dependencies...')
                    process.chdir(projectPath+'/frontend'); 
                    execSync('yarn install');
                    process.chdir(projectPath+'/backend');
                    execSync('yarn install');
                }
                console.log('\x1b[32m%s\x1b[0m','The installation of packages is done');
            })();
            console.log('\x1b[33m%s\x1b[0m', 'Getting your app  ready!');
            execSync('npx rimraf ./.git');
            fs.rmdirSync(path.join(projectPath, 'bin'), { recursive: true });

        } catch (error) {
            console.log(error);
        }
    }
    main();
}

if (require.main === module) {
    main();
}
