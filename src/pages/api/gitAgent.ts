export const GET = async () => {
  const metrics = {
    systemHealth: {
      healthOverview: {
        grade: 'A-',
        trend: 'IMPROVING',
        score: 88,
        status: 'healthy',
      },
      ciCdHealth: {
        lastRun: 'FAILURE',
        status: 'failing',
        successRate: '94.2%',
        avgDuration: '390s',
        workflow: 'main',
      },
      securityPosture: {
        secretAlerts: 0,
        highVulnerabilities: 2,
        criticalVulnerabilities: 0,
        outdatedDeps: 5,
      },
      velocityAndQuality: {
        testCoverage: '84.2%',
        prLeadTime: '14.5h',
        openPrs: 8,
        openBugs: 6,
      },
      riskMetrics: {
        activeContributors: 9,
        busFactor: 3,
        staleBranches: 3,
      },
    },
  };

  return new Response(JSON.stringify(metrics), {
    headers: { 'Content-Type': 'application/json' },
  });
};
