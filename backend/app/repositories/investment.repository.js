export default function investmentRepository(investmentModels){

    const getInvestment = (investment_id)=> {
        return investmentModels.getInvestment(investment_id);
    }

    const getMultipleInvestments = (page, investmentsPerPage)=> {
        return investmentModels.getMultipleInvestments(page, investmentsPerPage);
    }

    const createInvestment = ({ customer_id, amount, docs, memo})=> {
        console.log("Here we go",{customer_id, amount, docs, memo})
        return investmentModels.createInvestment({ customer_id, amount, docs, memo});
    }

    const updateInvestment = ({ investment_id, customer_id, amount, docs, memo})=> {
        return investmentModels.updateInvestment({ investment_id, customer_id, amount, docs, memo});
    }

    const removeInvestment = (investment_id)=> {
        return investmentModels.removeInvestment(investment_id);
    }

    return {getInvestment, getMultipleInvestments, createInvestment, updateInvestment, removeInvestment}
}