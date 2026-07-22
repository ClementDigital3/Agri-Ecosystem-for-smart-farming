import { useState, useMemo, useEffect } from 'react';

const mockMarketPrices = [
    { id: 'maize', crop: 'Maize', price: 4100, icon: '🌽' },
    { id: 'wheat', crop: 'Wheat', price: 5400, icon: '🌾' },
    { id: 'beans', crop: 'Beans (Rosecoco)', price: 11500, icon: '🫘' },
    { id: 'potatoes', crop: 'Irish Potatoes', price: 3200, icon: '🥔' },
];

function ProfitCalculator() {
    const [selectedCrop, setSelectedCrop] = useState(() => {
        return localStorage.getItem('shambaiq_profit_crop') || 'maize';
    });
    
    // Store as strings/numbers to allow clean deletion in inputs without forcing leading zeros
    const [area, setArea] = useState(() => {
        const val = localStorage.getItem('shambaiq_profit_area');
        return val !== null ? val : '5';
    });
    
    const [yieldEstimate, setYieldEstimate] = useState(() => {
        const val = localStorage.getItem('shambaiq_profit_yield');
        return val !== null ? val : '15';
    });
    
    const [costs, setCosts] = useState(() => {
        const val = localStorage.getItem('shambaiq_profit_costs');
        return val ? JSON.parse(val) : {
            seed: '5000',
            fertilizer: '12000',
            labor: '25000',
            other: '8000',
        };
    });

    // Persist parameters to localStorage
    useEffect(() => {
        localStorage.setItem('shambaiq_profit_crop', selectedCrop);
    }, [selectedCrop]);

    useEffect(() => {
        localStorage.setItem('shambaiq_profit_area', area.toString());
    }, [area]);

    useEffect(() => {
        localStorage.setItem('shambaiq_profit_yield', yieldEstimate.toString());
    }, [yieldEstimate]);

    useEffect(() => {
        localStorage.setItem('shambaiq_profit_costs', JSON.stringify(costs));
    }, [costs]);

    const handleCostChange = (e) => {
        const { name, value } = e.target;
        setCosts(prev => ({ ...prev, [name]: value }));
    };

    const selectedCropData = useMemo(() => {
        return mockMarketPrices.find(p => p.id === selectedCrop) || mockMarketPrices[0];
    }, [selectedCrop]);

    // Cast string inputs to Numbers safely for math calculations
    const nArea = Number(area) || 0;
    const nYield = Number(yieldEstimate) || 0;
    const nCosts = {
        seed: Number(costs.seed) || 0,
        fertilizer: Number(costs.fertilizer) || 0,
        labor: Number(costs.labor) || 0,
        other: Number(costs.other) || 0
    };

    const marketPrice = selectedCropData.price;
    const totalYield = nArea * nYield;
    const grossRevenue = totalYield * marketPrice;
    const totalCosts = Object.values(nCosts).reduce((sum, val) => sum + val, 0);
    const netProfit = grossRevenue - totalCosts;
    const roi = totalCosts > 0 ? ((netProfit / totalCosts) * 100).toFixed(1) : 0;
    const costPerBag = totalYield > 0 ? (totalCosts / totalYield).toFixed(0) : 0;

    const formatCurrency = (value) => new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', minimumFractionDigits: 0 }).format(value);

    return (
        <div className="profit-calc">
            {/* Crop Selector Strip */}
            <div className="profit-calc__crop-strip">
                <span className="profit-calc__strip-label">Select Crop</span>
                <div className="profit-calc__crop-pills">
                    {mockMarketPrices.map(crop => (
                        <button
                            key={crop.id}
                            className={`profit-calc__pill ${selectedCrop === crop.id ? 'profit-calc__pill--active' : ''}`}
                            onClick={() => setSelectedCrop(crop.id)}
                        >
                            <span className="profit-calc__pill-icon">{crop.icon}</span>
                            <span className="profit-calc__pill-name">{crop.crop}</span>
                            <span className="profit-calc__pill-price">{formatCurrency(crop.price)}/bag</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="profit-calc__body">
                {/* Input Panel */}
                <div className="profit-calc__inputs-panel">
                    <div className="profit-calc__section-header">
                        <span className="profit-calc__section-icon">📐</span>
                        <div>
                            <h4 className="profit-calc__section-title">Farm Parameters</h4>
                            <p className="profit-calc__section-sub">Configure your land and yield estimates</p>
                        </div>
                    </div>

                    <div className="profit-calc__input-grid">
                        <div className="profit-calc__field">
                            <label className="profit-calc__label">
                                <span className="profit-calc__label-icon">📏</span>
                                Area (Hectares)
                            </label>
                            <div className="profit-calc__input-wrap">
                                <input 
                                    type="number" 
                                    value={area} 
                                    min="0" 
                                    step="any"
                                    onChange={(e) => setArea(e.target.value)} 
                                />
                                <span className="profit-calc__input-unit">Ha</span>
                            </div>
                        </div>

                        <div className="profit-calc__field">
                            <label className="profit-calc__label">
                                <span className="profit-calc__label-icon">📦</span>
                                Est. Yield (Bags/Ha)
                            </label>
                            <div className="profit-calc__input-wrap">
                                <input 
                                    type="number" 
                                    value={yieldEstimate} 
                                    min="0"
                                    onChange={(e) => setYieldEstimate(e.target.value)} 
                                />
                                <span className="profit-calc__input-unit">90kg bags</span>
                            </div>
                        </div>
                    </div>

                    <div className="profit-calc__section-header" style={{ marginTop: '1.5rem' }}>
                        <span className="profit-calc__section-icon">💰</span>
                        <div>
                            <h4 className="profit-calc__section-title">Production Costs</h4>
                            <p className="profit-calc__section-sub">Enter your total expected expenses</p>
                        </div>
                    </div>

                    <div className="profit-calc__input-grid profit-calc__input-grid--costs">
                        <div className="profit-calc__field">
                            <label className="profit-calc__label">🌱 Seed</label>
                            <div className="profit-calc__input-wrap">
                                <span className="profit-calc__input-prefix">KES</span>
                                <input type="number" name="seed" value={costs.seed} onChange={handleCostChange} />
                            </div>
                        </div>
                        <div className="profit-calc__field">
                            <label className="profit-calc__label">🧪 Fertilizer & Chemicals</label>
                            <div className="profit-calc__input-wrap">
                                <span className="profit-calc__input-prefix">KES</span>
                                <input type="number" name="fertilizer" value={costs.fertilizer} onChange={handleCostChange} />
                            </div>
                        </div>
                        <div className="profit-calc__field">
                            <label className="profit-calc__label">👷 Labor</label>
                            <div className="profit-calc__input-wrap">
                                <span className="profit-calc__input-prefix">KES</span>
                                <input type="number" name="labor" value={costs.labor} onChange={handleCostChange} />
                            </div>
                        </div>
                        <div className="profit-calc__field">
                            <label className="profit-calc__label">🚛 Other (Transport, etc.)</label>
                            <div className="profit-calc__input-wrap">
                                <span className="profit-calc__input-prefix">KES</span>
                                <input type="number" name="other" value={costs.other} onChange={handleCostChange} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Panel */}
                <div className="profit-calc__results-panel">
                    <div className="profit-calc__results-header">
                        <span className="profit-calc__results-icon">📊</span>
                        <h4>Financial Summary</h4>
                    </div>

                    {/* Quick KPIs */}
                    <div className="profit-calc__kpi-row">
                        <div className="profit-calc__kpi">
                            <span className="profit-calc__kpi-label">Total Yield</span>
                            <strong className="profit-calc__kpi-value">{totalYield.toLocaleString()}</strong>
                            <span className="profit-calc__kpi-unit">Bags</span>
                        </div>
                        <div className="profit-calc__kpi">
                            <span className="profit-calc__kpi-label">Price / Bag</span>
                            <strong className="profit-calc__kpi-value">{formatCurrency(marketPrice)}</strong>
                            <span className="profit-calc__kpi-unit">{selectedCropData.crop}</span>
                        </div>
                        <div className="profit-calc__kpi">
                            <span className="profit-calc__kpi-label">Cost / Bag</span>
                            <strong className="profit-calc__kpi-value">{formatCurrency(Number(costPerBag))}</strong>
                            <span className="profit-calc__kpi-unit">Break-even</span>
                        </div>
                    </div>

                    {/* Revenue vs Cost Bar */}
                    <div className="profit-calc__bar-visual">
                        <div className="profit-calc__bar-labels">
                            <span>Revenue vs Costs</span>
                            <span className={netProfit >= 0 ? 'profit-calc__positive' : 'profit-calc__negative'}>
                                ROI: {roi}%
                            </span>
                        </div>
                        <div className="profit-calc__bar-track">
                            <div className="profit-calc__bar-fill profit-calc__bar-fill--revenue"
                                style={{ width: '100%' }} />
                            <div className="profit-calc__bar-fill profit-calc__bar-fill--cost"
                                style={{ width: grossRevenue > 0 ? `${(totalCosts / grossRevenue) * 100}%` : '100%' }} />
                        </div>
                        <div className="profit-calc__bar-legend">
                            <span><i className="dot-rev"></i> Revenue: {formatCurrency(grossRevenue)}</span>
                            <span><i className="dot-cost"></i> Costs: {formatCurrency(totalCosts)}</span>
                        </div>
                    </div>

                    {/* Final Profit Card */}
                    <div className={`profit-calc__verdict ${netProfit >= 0 ? 'profit-calc__verdict--profit' : 'profit-calc__verdict--loss'}`}>
                        <div className="profit-calc__verdict-header">
                            <span>{netProfit >= 0 ? '🎯' : '⚠️'}</span>
                            <span className="profit-calc__verdict-tag">
                                {netProfit >= 0 ? 'PROJECTED PROFIT' : 'PROJECTED LOSS'}
                            </span>
                        </div>
                        <strong className="profit-calc__verdict-amount">
                            {formatCurrency(netProfit)}
                        </strong>
                        <p className="profit-calc__verdict-note">
                            {netProfit >= 0
                                ? `You stand to earn ${formatCurrency(netProfit)} per season on ${nArea} hectares of ${selectedCropData.crop}.`
                                : `Current costs exceed projected revenue. Consider reducing expenses or increasing yield targets.`
                            }
                        </p>
                    </div>

                    <p className="profit-calc__disclaimer">
                        ⓘ This is an estimate based on current NCPB & local market averages. Actual results may vary based on weather conditions, market fluctuations, and final yield.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ProfitCalculator;