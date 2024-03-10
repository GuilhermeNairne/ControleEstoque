import { ProdutosService } from './produtos.service';
import { Produto } from './produto.model';
export declare class ProdutosController {
    private produtosService;
    constructor(produtosService: ProdutosService);
    create(produto: Produto): Promise<Produto>;
}
