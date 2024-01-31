import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbApiService } from 'src/app/shared/services/tmdb-api.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserListService } from 'src/app/shared/services/user-list.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{
  sanitizer: any;
  inList: boolean = false; 
  isAuthenticated: boolean = false;
  constructor(private tmdbApiService: TmdbApiService, private router: ActivatedRoute, private userListService: UserListService, public authService: AuthService) {}

  getDetailsResult:any;
  getVideoResult:any;
  getCastResult:any;

  getVideoResults: SafeResourceUrl | any;

  ngOnInit(): void {
    let getParamId = this.router.snapshot.paramMap.get('id');
    let getParamType = this.router.snapshot.paramMap.get('media_type');
    console.log(getParamId, 'getParamId#');
    console.log(getParamType, 'getParamType#');

    this.getDetails(getParamId, getParamType);
    this.getVideo(getParamId, getParamType);
    this.getCast(getParamId, getParamType);
    
    // this.userListService.inList(String(getParamType), Number(getParamId)).subscribe((inList: boolean) => {
    //   console.log(`¿Está en la lista? ${inList}`);
    //   this.inList = inList;
    // });

  }

  addOrRemoveFromList(): void {
    let type = String(this.router.snapshot.paramMap.get('media_type')); 
    let id = Number(this.router.snapshot.paramMap.get('id'));

    // if (this.inList) {
    //   this.userListService.removeFromList(type, id);
    // } else {
    //   this.userListService.addFromList(type, id);
    // }
  
    this.inList = !this.inList;
  }

  getDetails(id:any, type:any){
    this.tmdbApiService.getDetails(id, type).subscribe((res)=>{
      console.log(res, 'getDetails#');
      this.getDetailsResult = res;
    });
  }

  getVideo(id:any, type:any){
    this.tmdbApiService.getVideo(id, type).subscribe((res)=>{
      res.results.forEach((element:any) => {
        if(element.type =="Trailer"){
          this.getVideoResult= element.key;
          console.log(this.getVideoResult);
        }
      });
    });
  }

  getCast(id:any, type:any){
    this.tmdbApiService.getCast(id, type).subscribe((res)=>{
      this.getCastResult = res.cast;
    });
  }

}
