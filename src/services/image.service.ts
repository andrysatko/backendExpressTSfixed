import * as path from "path";
import * as uuid from "uuid";

export class ImageService {
       static async setImg(img: any):Promise<string[]> {
        const uuidFileName: string = uuid.v4();
        if ("mv" in img) {
            const fileName = uuidFileName + '.' + img.name.split('.').pop();
            const Full_PAth: string =  path.join(__dirname, '..','..', 'src', 'static',uuidFileName + '.' + img.name.split('.').pop() ) ;
            await img.mv(Full_PAth)
            return [fileName,Full_PAth]
        }
        else return ['','']
    }
}