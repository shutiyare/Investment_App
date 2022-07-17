// validate inputs before you pass them to repos

export default function investmentUseCases(investmentRepository){

    function getInvestment(investment_id){
        if(!investment_id || isNaN(investment_id)){
            const error = new Error('Bad request');
            error.status = 400;
            throw error;
        }
        return investmentRepository.getInvestment(investment_id);
    }

    function getMultipleInvestments(page, size){
        console.log(!page , isNaN(page) , !size , isNaN(size) , Number(page) < 0 , Number(size) < 0)
        if(!page || isNaN(page) || !size || isNaN(size) || Number(page) < 0 || Number(size) < 0){
            const error = new Error('Bad request');
            error.status = 400;
            throw error;
        }
        return investmentRepository.getMultipleInvestments(page, size);
    }

    function createInvestment({ customer_id, amount, docs, memo }){
        console.log(!customer_id , isNaN(customer_id) ,!amount , !docs , !memo )
        if(!customer_id || isNaN(customer_id) || !amount || !docs  ){
            const error = new Error('Bad request');
            error.status = 400;
            throw error;
        }
        return investmentRepository.createInvestment({ customer_id, amount, docs, memo });
    }

    function updateInvestment({ investment_id, customer_id, amount, docs, memo}){
        if(!investment_id || isNaN(investment_id) && (!customer_id || isNaN(customer_id))){
            const error = new Error('Bad request');
            error.status = 400;
            throw error;
        }
        return investmentRepository.updateInvestment({ investment_id, customer_id, amount, docs, memo});
    }

    function removeInvestment(investment_id){
        if(!investment_id || isNaN(investment_id)){
            const error = new Error("Bad request");
            error.status = 400;
            throw error;
        }
        return investmentRepository.removeInvestment(investment_id);
    }

    return {getInvestment, getMultipleInvestments, createInvestment, updateInvestment, removeInvestment}
}