
class CreateGroupForm {
    elements = {
        novoGrupoBtn: () => cy.contains('Novo Grupo'),
        nome: () => cy.get('#name'),
        caminho: () => cy.get('#path'),
        tipo: () => cy.get('#type'),
        submit: () => cy.get('button[type="submit"]'),
        geolocalizacao: () =>
            cy
                .contains('Usa Geolocalização')
                .parent()
                .parent()
                .find('button[type="button"]'),
        ativo: () =>
            cy
                .contains('Ativo')
                .parent()
                .parent()
                .find('button[type="button"]'),
        tokenDeAcesso: () =>
            cy
                .contains('Token de Acessso')
                .parent()
                .parent()
                .find('button[type="button"]'),
        mensagemSucesso: () => cy.contains('Grupo criado com sucesso!'),
    }
    clickNovoGrupo() {
        this.elements.novoGrupoBtn().click()
    }
    typeNome(text) {
        if (!text) return
        this.elements.nome().type(text)
    }
    typeCaminho(text) {
        if (!text) return
        this.elements.caminho().type(text)
    }
    clickGeolocalizacao() {
        this.elements.geolocalizacao().click()
    }
    clickAtivo() {
        this.elements.ativo().click()
    }
    clickTokenDeAcesso() {
        this.elements.tokenDeAcesso().click()
    }
    clickSubmit() {
        this.elements.submit().click()
    }
}

const createGroupForm = new CreateGroupForm()
describe('Criar Grupo', () => {
    describe('Criar Grupo Com Sucesso', () => {
        const input = {
            nome: 'Grupo Testeandoa',
            caminho: 'grupotesteandoa',
        }
        it(`Dado que o usuário está autenticado`, () => {
            cy.window().then((win) => {
                const authData = JSON.parse(win.localStorage.getItem('auth_data'));
                return authData && authData.isAuthenticated === true;
            })
        })
        it('Estou na página Grupos e Links', () => {
            cy.visit('/groups')
        })
        it('Estou na página Novo Grupo', () => {
            createGroupForm.clickNovoGrupo()
        })
        it(`Quando entro com ${input.nome} no campo nome`, () => {
            createGroupForm.typeNome(input.nome)
        })
        it(`Quando entro com ${input.caminho} no campo nome`, () => {
            createGroupForm.typeCaminho(input.caminho)
        })
        it(`Quando clico no botão Ativo`, () => {
            createGroupForm.clickAtivo()
        })
        it(`Quando clico no botão Enviar`, () => {
            createGroupForm.clickSubmit()
        })
        it(`Então deve aparecer a mensagem de sucesso`, {
            defaultCommandTimeout: 60000
        }, () => {
            createGroupForm.elements
                .mensagemSucesso()
                .should(
                    'be.visible',
                    'contains.text',
                    'Grupo criado com sucesso!'
                )
        })
    })
})
