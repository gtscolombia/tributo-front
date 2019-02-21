import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginationPipe} from './pagination/pagination.pipe';
import { ProfilePicturePipe } from './profilePicture/profilePicture.pipe';
import { ChatPersonSearchPipe } from './search/chat-person-search.pipe';
import { TributoSearchPipe } from './search/tributo-search.pipe';
import { TruncatePipe } from './truncate/truncate.pipe';
import { MailSearchPipe } from './search/mail-search.pipe';
import { FechaPipe } from './fechas/fecha.pipe';
import { TributoByUsuTributoSearchPipe } from './search/tributo-by-usutributo.pipe'
@NgModule({
    imports: [ 
        CommonModule 
    ],
    declarations: [
        PaginationPipe,
        ProfilePicturePipe,
        ChatPersonSearchPipe,
        TributoSearchPipe,
        TruncatePipe,
        MailSearchPipe,
        FechaPipe,
        TributoByUsuTributoSearchPipe
    ],
    exports: [
        PaginationPipe,
        ProfilePicturePipe,
        ChatPersonSearchPipe,
        TributoSearchPipe,
        TruncatePipe,
        MailSearchPipe,
        FechaPipe,
        TributoByUsuTributoSearchPipe
    ]
})
export class PipesModule { }
