import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Home } from "../index";
import { getDatasCorte } from "../../../services/consultaAluno.service";

jest.mock("react-input-mask", () => {
    const React = require("react");
    return React.forwardRef((props, ref) => {
        return <input ref={ref} {...props} />;
    });
});

jest.mock("react-hook-form", () => ({
    useForm: () => ({
        register: jest.fn(),
        handleSubmit: (fn) => fn,
        errors: {}
    })
}));

jest.mock("../../../components/BtnCustomizado", () => ({
    BtnCustomizado: ({ texto, classeCss, type }) => (
        <button type={type} className={classeCss}>
            {texto}
        </button>
    )
}));

jest.mock("../../../services/consultaAluno.service", () => ({
    getDatasCorte: jest.fn(() =>
        Promise.resolve({
            data: {
                data_corte_lote: "2026-01-09",
                data_corte_planilha: "2026-02-10"
            },
        })
    ),
    getSituacaoCPF: jest.fn()
}));

describe("Home - Datas de Corte", () => {

    it("deve exibir datas no formato DD/MM/YYYY", async () => {

        await act(async () => {
            render(<Home />);
            await new Promise(resolve => setTimeout(resolve, 100));
        });

        const label = screen.getByText(/Informações atualizadas até o dia 10\/02\/2026/i);

        expect(label).toBeInTheDocument();
        expect(getDatasCorte).toHaveBeenCalled();
    });

});