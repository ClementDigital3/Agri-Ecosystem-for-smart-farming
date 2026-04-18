import PageHeader from '../components/PageHeader';
import ProfitCalculator from '../components/ProfitCalculator';

function ProfitabilityPage() {
    return (
        <section className="page-stack profit-screen">
            <PageHeader
                eyebrow="Financial Planning"
                title="Profitability Calculator"
                subtitle="Forecast your potential earnings by inputting estimated yields and operational costs against current market prices."
                accent="finance"
                stats={[
                    { label: 'Currency', value: 'KES' },
                    { label: 'Season', value: '2026 Long Rains' },
                    { label: 'Data Source', value: 'NCPB & Local' },
                ]}
            />
            <ProfitCalculator />
        </section>
    );
}

export default ProfitabilityPage;