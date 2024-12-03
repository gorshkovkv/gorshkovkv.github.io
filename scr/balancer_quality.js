// Модуль для проверки качества балансеров
(function () {
    'use strict';

    // Оценка качества для каждого балансера
    const balancerQuality = {
        lumex: 0,
        rezka: 0,
        rezka2: 0,
        kinobase: 0,
        collaps: 0,
        cdnmovies: 0,
        filmix: 0,
        zetflix: 0,
        fancdn: 0,
        fanserials: 0,
        alloha: 0,
        redheadsound: 0,
        anilibria: 0,
        kodik: 0,
        kinopub: 0
    };

    // Функция для проверки наличия контента на балансере
    async function checkBalancer(balancer, query) {
        return new Promise((resolve) => {
            try {
                const timeout = setTimeout(() => {
                    resolve({ available: false, quality: 0 });
                }, 5000);

                Lampa.Utils[balancer](query, (result) => {
                    clearTimeout(timeout);
                    if (result && result.items && result.items.length > 0) {
                        const quality = calculateQuality(result);
                        resolve({ available: true, quality: quality });
                    } else {
                        resolve({ available: false, quality: 0 });
                    }
                }, () => {
                    clearTimeout(timeout);
                    resolve({ available: false, quality: 0 });
                });
            } catch (e) {
                resolve({ available: false, quality: 0 });
            }
        });
    }

    // Функция расчета качества стрима
    function calculateQuality(result) {
        let maxQuality = 0;
        try {
            result.items.forEach(item => {
                if (item.quality) {
                    const qualityNum = parseInt(item.quality.replace(/[^0-9]/g, ''));
                    maxQuality = Math.max(maxQuality, qualityNum);
                }
            });
        } catch (e) {
            console.error('Error calculating quality:', e);
        }
        return maxQuality;
    }

    // Функция для проверки всех балансеров
    async function checkAllBalancers(query) {
        const balancers = Object.keys(balancerQuality);
        const results = await Promise.all(
            balancers.map(async (balancer) => {
                const result = await checkBalancer(balancer, query);
                balancerQuality[balancer] = result.quality;
                return {
                    balancer,
                    ...result
                };
            })
        );

        // Сортировка по качеству
        return results
            .filter(r => r.available)
            .sort((a, b) => b.quality - a.quality);
    }

    // Функция получения лучшего балансера
    function getBestBalancer(query) {
        return new Promise((resolve) => {
            checkAllBalancers(query).then(results => {
                if (results.length > 0) {
                    resolve(results[0].balancer);
                } else {
                    resolve(null);
                }
            });
        });
    }

    // Экспорт функций
    window.BalancerQuality = {
        checkAllBalancers: checkAllBalancers,
        getBestBalancer: getBestBalancer
    };
})();
