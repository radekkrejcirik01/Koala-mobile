import { putRequest } from '@utils/Axios/Axios.service';
import { ResponseInterface } from '@interfaces/response/Response.interface';

class OnlineServiceClass {
    public update = () => {
        putRequest<ResponseInterface, never>('last-online').subscribe();
    };
}

export const OnlineService: OnlineServiceClass = new OnlineServiceClass();
