import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

describe('ProductsService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('tests for getAllProducts', () => {
    //arrange(que es lo que espero recibir)
    //Espero que me devuelva un array de productos

    it('should return products', () => {
      const expectData = [
        {
          id: '1',
          title: 'asas',
          price: 2,
          description: 'desc',
          image: 'img/img.jpg'
        },
        {
          id: '2',
          title: 'dfds',
          price: 2,
          description: 'desc',
          image: 'img/img.jpg'
        }
      ];

      let dataError, dataResponse;
      //Ya tenemos la data preparada ahora vamos a actuar
      //act

      service.getAllProducts().subscribe(
        response => {
          dataResponse = response;
        }, error => dataError = error
      );
      const request = httpTestingController.expectOne(`${environment.url_api}/products`);
      request.flush(expectData);

      //assert
      //Resolvemos nuestras hipotesis
      expect(dataResponse.length).toEqual(2);
      expect(request.request.method).toEqual('GET');
      expect(dataError).toBeUndefined();
    });
  });
});
