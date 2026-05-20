import { useEffect, useState } from "react";

const Dashboard = () => {
  const [isLoading,setLoading] = useState(false);
  const stats = [
    { label: 'Total Sales', value: '$72.4k', icon: 'bi-currency-dollar', change: '+12.3%' },
    { label: 'New Users', value: '1,842', icon: 'bi-people-fill', change: '+8.9%' },
    { label: 'Orders', value: '634', icon: 'bi-bag-fill', change: '+6.1%' },
    { label: 'Products', value: '128', icon: 'bi-box-seam', change: '+4.4%' }
  ]

  const chartPoints = [60, 75, 68, 90, 85, 96, 110]
  const chartLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const maxPoint = Math.max(...chartPoints)

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div
        className="vh-100 vw-100 d-flex justify-content-center align-items-center position-fixed top-0 start-0"
        style={{
          background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(10px)",
          zIndex: 9999,
        }}
      >
        <div className="text-center text-white">
          
          {/* Spinner */}
          <div
            className="spinner-border text-light mb-3"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          ></div>

          {/* Text */}
          <h5 className="fw-bold">Loading...</h5>
          <p className="text-secondary mb-0">
            Please wait while we prepare your data
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div>
          <h2 className="mb-1">Admin Dashboard</h2>
          <p className="text-muted mb-0">A quick overview of sales, traffic, and product activity.</p>
        </div>
        <button className="btn btn-primary shadow-sm">
          <i className="bi bi-arrow-repeat me-2" /> Refresh dashboard
        </button>
      </div>

      <div className="row g-3 mb-4">
        {stats.map((stat) => (
          <div key={stat.label} className="col-12 col-sm-6 col-xl-3">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="bg-light text-primary rounded-3 p-3">
                    <i className={`bi ${stat.icon} fs-4`} />
                  </div>
                  <span className="badge bg-success bg-opacity-10 text-success">{stat.change}</span>
                </div>
                <h5 className="card-title mb-1">{stat.value}</h5>
                <p className="text-muted mb-0">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row gy-4">
        <div className="col-12 col-xl-8">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
                <div>
                  <h5 className="card-title mb-1">Weekly Revenue</h5>
                  <p className="text-muted mb-0">Revenue performance for the last 7 days.</p>
                </div>
                <div className="btn-group" role="group" aria-label="Traffic period">
                  <button type="button" className="btn btn-outline-secondary active">7D</button>
                  <button type="button" className="btn btn-outline-secondary">30D</button>
                </div>
              </div>

              <div className="chart-area" style={{ minHeight: 320, position: 'relative' }}>
                <svg viewBox="0 0 700 320" className="w-100 h-100">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0d6efd" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#0d6efd" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d={chartPoints
                      .map((point, index) => {
                        const x = 80 + index * 90
                        const y = 280 - (point / maxPoint) * 220
                        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
                      })
                      .join(' ')}
                    fill="none"
                    stroke="#0d6efd"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d={
                      chartPoints
                        .map((point, index) => {
                          const x = 80 + index * 90
                          const y = 280 - (point / maxPoint) * 220
                          return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
                        })
                        .concat(' L 650 320 L 80 320')
                        .join(' ')
                    }
                    fill="url(#chartGradient)"
                    opacity="0.8"
                  />
                  {chartPoints.map((point, index) => {
                    const x = 80 + index * 90
                    const y = 280 - (point / maxPoint) * 220
                    return (
                      <g key={index}>
                        <circle cx={x} cy={y} r="7" fill="#0d6efd" stroke="#fff" strokeWidth="3" />
                        <text x={x} y={y - 16} textAnchor="middle" fill="#212529" fontSize="12">{point}</text>
                      </g>
                    )
                  })}
                  {chartLabels.map((label, index) => (
                    <text key={label} x={80 + index * 90} y="305" textAnchor="middle" fill="#6c757d" fontSize="12">
                      {label}
                    </text>
                  ))}
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                  <h5 className="card-title mb-1">Top Metrics</h5>
                  <p className="text-muted mb-0">Fast insights by channel and status.</p>
                </div>
                <i className="bi bi-graph-up-arrow fs-3 text-primary" />
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Conversion Rate</span>
                  <strong>27.4%</strong>
                </div>
                <div className="progress" style={{ height: '10px' }}>
                  <div className="progress-bar bg-primary" role="progressbar" style={{ width: '74%' }} aria-valuenow="74" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Customer Satisfaction</span>
                  <strong>91%</strong>
                </div>
                <div className="progress" style={{ height: '10px' }}>
                  <div className="progress-bar bg-success" role="progressbar" style={{ width: '91%' }} aria-valuenow="91" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>

              <div>
                <div className="d-flex justify-content-between mb-3">
                  <span className="fw-semibold">Live orders</span>
                  <span className="text-muted">24 now</span>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0 border-0 pb-2">
                    <div>
                      <span className="badge bg-secondary bg-opacity-10 text-secondary me-2"><i className="bi bi-truck" /></span>
                      Shipping
                    </div>
                    <span className="text-success">+14</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0 border-0 pb-2">
                    <div>
                      <span className="badge bg-info bg-opacity-10 text-info me-2"><i className="bi bi-cart-check" /></span>
                      Checkout
                    </div>
                    <span className="text-primary">+8</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0 border-0 pb-2">
                    <div>
                      <span className="badge bg-warning bg-opacity-10 text-warning me-2"><i className="bi bi-exclamation-circle" /></span>
                      Returns
                    </div>
                    <span className="text-danger">2</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
