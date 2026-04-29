import { fileURLToPath } from "url";

import * as fs from 'node:fs'
import * as path from 'node:path'


const readSubDirSync = (folderPath: string):Array<string> => {
    let result: Array<string> = [];
    const readTopDirSync = ((folderPath: string) => {
      let items = fs.readdirSync(folderPath);
      items = items.map((itemName) => {
        return path.join(folderPath, itemName);
      });
      items.forEach((itemPath) => {
        result.push(itemPath);
        if (fs.statSync(itemPath).isDirectory()) {
          readTopDirSync(itemPath);
          //再帰処理
        }
      });
    });
    readTopDirSync(folderPath);
    return result;
  };
const dirparth = path.join(fileURLToPath(import.meta.url),'../endpoints')//fileURLToPath(import.meta.url),'./packages/',path.relative(fileURLToPath(import.meta.url),'./packages/backend/src/server/apiv2/endpoints'))
const endpoints = readSubDirSync(dirparth)
let exportMoji:string = '';
	for (const endpoint of endpoints){
		const tess = fs.statSync(endpoint);

		if(!tess.isDirectory()){
			const endpointImport = await import(endpoint)
			const {default: def} = endpointImport;
			if(def?.path){
				const endpointName = def?.path.replace('api/','')
				const endpointPath = path.relative(fileURLToPath(import.meta.url),endpoint).replace('../','./')
				console.log(endpointPath)
				const nextExport = `export { default as \"${endpointName}\" } from '${endpointPath}'\n`
				exportMoji = exportMoji + nextExport
			}
			/**

			const aaaa = import(endpoint).then(aaa => {
				console.log(aaa)
				if(aaa?.default){
					const {default: def} = aaa
					Honoland.get(def?.path,(c) => {
						const result = def.execute(c)
						if(typeof result === 'object'){
							return c.json(result)
						}
						return c.text('something error!')
					})
				}
			})
			*/
		}
	}
const modPath = path.join(
		path.join(fileURLToPath(import.meta.url),'../mod.ts')
	)

fs.writeFileSync(modPath,exportMoji)
