import { Component } from "@angular/core";

@Component({
    selector: 'app-market-place-details',
    templateUrl: './market-place-details.component.html',
    styleUrls: [
        './market-place-details.component.scss',
    ]
})
export class MarketPlaceDetailsComponent {
    steps: {
        name: string;
        image: string;
        title: string;
        text: string;
        hasButton: boolean;
        buttonRouting: string;
        buttonText: string;
    }[] = [
        {
            name: "Adicione",
            image: '../../assets/add-product.png',
            title: 'Venda Seus Produtos Agora Mesmo!',
            text: 'Cadastre seus melhores produtos para que eles possam ser vendidos pelo nosso market-place.',
            hasButton: true,
            buttonRouting: '/products/new',
            buttonText: 'Cadastrar Produto',
        },
        {
            name: "Gerencie",
            image: '../../assets/gerencia-product.png',
            title: 'Saiba como estão indo seus produtos!',
            text: 'Obtenha informações, como avaliações, e entenda como estão indo seus produtos no nosso market-place. Você também pode alterar os produtos já cadastrados!',
            hasButton: true,
            buttonRouting: '/products',
            buttonText: 'Meus Produtos',
        },
        {
            name: "Compre",
            image: '../../assets/compre-product.png',
            title: 'Faça compras de outros vendedores!',
            text: 'Afinal, todos precisamos compras, então essa é uma boa oportunidade de fazer compras e analisar como o seu comprador irá sentir comprando no nosso market-place!',
            hasButton: false,
            buttonRouting: '/products',
            buttonText: 'Meus Produtos',
        }
    ];
    currentStep: number = 0;

    changeCurrentStep(step: number) {
        this.currentStep = step;
    }
};