import { Component, OnInit } from '@angular/core';
import { FormulaireService } from 'app/services/formulaire/formulaire.service';
import { AuthService } from 'app/services/auth/auth.service';
import { Router } from '@angular/router';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { DocumentService } from 'app/services/document/document.service';
import { NotificationService } from 'app/services/notification/notification.service';
import { UserService } from 'app/services/user/user.service';
class ImageSnippet {
  constructor(public src: string, public file: File) { }
}
@Component({
  selector: 'app-ajouter-rapport',
  templateUrl: './ajouter-rapport.component.html',
  styleUrls: ['./ajouter-rapport.component.scss']
})
export class AjouterRapportComponent implements OnInit {

  files: any = [];
  isBalance: boolean = false;
  isBilan: boolean = false;
  isEtat: boolean = false;
  index = 1;
  formId: any;
  selectedFile: ImageSnippet;
  message = "Ajouter une balance ou un bilan et un etat de resultat (xlsx, xlsm, xltx, xltm)";
  date_etat: Date = new Date();
  date_bilan: Date = new Date();
  date_balance: Date = new Date();
  now: Date = new Date()
  adminIds: any;
  user: any;
  constructor(private formulaireService: FormulaireService,
    private authService: AuthService,
    private router: Router,
    private documentService: DocumentService,
    private notificationService: NotificationService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.authService.getUserfromToken()
    this.formulaireService.getByUser(this.authService.getIdfromToken()).subscribe(res => {
      if (res.success) {
        if (!res.obj || res.obj.length <= 0) {
          this.router.navigate(['/client/formulaire/ajouter-formulaire']);
        } else {
          this.formId = res.obj[res.obj.length - 1]._id;
          console.log(res)
        }
      } else {

      }
    })
    this.userService.getAdminIds().subscribe(res => {
      console.log(res)
      if (res.success) {
        this.adminIds = res.obj;
      } else {
        //err
      }
    })

    this.documentService.getBilan().subscribe(res => {
      if (res.success) {
        console.log(res.obj)
      }
    })
  }




  /*public dropped(files: NgxFileDropEntry[], type) {
    console.log(files)
    if (files.length == 1) {
      console.log("files length is 1")
      if (files[0].fileEntry.isFile && this.isFileAllowed(files[0].relativePath)) {
        console.log("is file and good extension")
        switch (Number(type)) {
          case 1:
            this.isBalance = true;
            break;
          case 2:
            this.isBilan = true;
            break;
          case 3:
            this.isEtat = true;
            break;
        }
        console.log(this.isBalance + " " + this.isBilan + " " + this.isEtat)
        console.log("after switch type" + type)
        const fileEntry = files[0].fileEntry as FileSystemFileEntry;
        if (this.isBalance) {
          fileEntry.file((file: File) => {
            this.documentService.uploadDocument(file, this.authService.getIdfromToken(),this.formId,this.date_balance).subscribe(res => {
              console.log(res)
              if (res.success) {
                this.router.navigate(['/client/rapport/consulter-rapport'], { queryParams: { id: res.obj._id } });
              } else {

              }
            })
          });
        } else {
          console.log("is else")
          fileEntry.file((file: File) => {
            this.files.push(file);
            console.log(file)
            if (this.isBilan && !this.isEtat) {
              console.log("is bilan")
              this.index = this.files.length - 1;
            }
            console.log(this.files)
            if (this.isBilan && this.isEtat && this.files.length == 2) {
              console.log("is bilan && etat")

              this.documentService.uploadDocuments(this.files, this.authService.getIdfromToken(), this.index,this.formId,this.date_bilan,this.date_etat).subscribe(res => {
                console.log(res)
                if (res.success) {
                  this.router.navigate(['/client/rapport/consulter-rapport'], { queryParams: { id: res.obj._id } });
                } else {

                }
              })
            } else {
              console.log("wait for other file")
            }
          })


        }
      } else {

        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = files[0].fileEntry as FileSystemDirectoryEntry;
        //Ce n'est pas un fichier ou l'extension du fichier n'est pas valide
        console.log("probleme extension")
        console.log(files[0].relativePath, fileEntry);
      }


    } else {
      console.log("un seul fichier autorisé")
      //nbr de fichier supérieur a 1
    }

  }*/


  isFileAllowed(fileName: string) {
    let isFileAllowed = false;
    const allowedFiles = ['.xlsx', '.xlsm', '.xltx', '.xltm'];
    const regex = /(?:\.([^.]+))?$/;
    const extension = regex.exec(fileName);
    console.log('extension du fichier : ', extension);
    if (undefined !== extension && null !== extension) {
      for (const ext of allowedFiles) {
        if (ext === extension[0]) {
          isFileAllowed = true;
        }
      }
    }
    return isFileAllowed;
  }


  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

  addFile(imageInputPic: any, type) {
    const file: File = imageInputPic.files[0];
    const reader = new FileReader();
    console.log(file)
    if (this.isFileAllowed(file.name)) {
      switch (Number(type)) {
        case 1:
          this.isBalance = true;
          break;
        case 2:
          this.isBilan = true;
          break;
        case 3:
          this.isEtat = true;
          break;
      }
      if (this.isBalance) {
        this.message = "En cours"
        this.documentService.uploadDocument(file, this.authService.getIdfromToken(), this.formId, this.date_balance.toISOString()).subscribe(res => {
          if (res.success) {
            let notification = {
              sender: this.authService.getIdfromToken(),
              general: true,
              receiver_general: this.adminIds,
              //receiver
              title: "Un nouveau rapport a été ajoutée",
              image: this.user.sigle,
              message: "Un rapport a été générer par " + this.user.raisonsocial,
              link: {
                url: "/admin/rapports/consulter-rapport",
                params: "id",
                paramsValue: res.obj._id
              }
            }
            this.notificationService.createNotification(notification).subscribe(res1=>{
              if(res1.success)
              {
                this.message = "Finis"
                this.router.navigate(['/client/rapport/consulter-rapport'], { queryParams: { id: res.obj._id } });
              }else{
                console.log(res1)
                this.message = "Erreur d'envoi de notification, veuillez contacter l'administrateur"
              }
            })
            
          } else {
            console.log(res)
            this.message = "Erreur, veuillez contacter l'administrateur"

          }
        }, (err) => {
          console.log(err)
          this.message = "Erreur, veuillez contacter l'administrateur"
        })
      } else {
        this.files.push(file);
        if (this.isBilan && !this.isEtat) {
          this.index = this.files.length - 1;
        }

        if (this.isBilan && this.isEtat && this.files.length == 2) {
          this.message = "En cours"
          this.documentService.uploadDocuments(this.files, this.authService.getIdfromToken(), this.index, this.formId, this.date_bilan.toISOString(), this.date_etat.toISOString()).subscribe(res => {
            if (res.success) {
              let notification = {
                sender: this.authService.getIdfromToken(),
                general: true,
                receiver_general: this.adminIds,
                //receiver
                title: "Un nouveau rapport a été ajoutée",
                image: this.user.sigle,
                message: "Un rapport a été générer par " + this.user.raisonsocial,
                link: {
                  url: "/admin/rapports/consulter-rapport",
                  params: "id",
                  paramsValue: res.obj._id
                }
              }
              this.notificationService.createNotification(notification).subscribe(res1=>{
                if(res1.success)
                {
                  this.message = "Finis"
                  this.router.navigate(['/client/rapport/consulter-rapport'], { queryParams: { id: res.obj._id } });
                }else{
                  console.log(res1)
                  this.message = "Erreur d'envoi de notification, veuillez contacter l'administrateur"
                }
              })
              
            } else {
              this.message = "Erreur, veuillez contacter l'administrateur"
            }
          })
        } else {
          if (this.isBilan) {
            this.message = "Veuillez ajouter un etat de resultat"
          } else {
            this.message = "Veuillez ajouter un bilan"
          }
        }



      }

    } else {
      this.message = "Type de fichier non autorisé (xlsx, xlsm, xltx, xltm)"
    }

  }

}
