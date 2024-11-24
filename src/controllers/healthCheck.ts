import { Request, Response } from "express";

export class HealthCheckController {
  healthCheck = async (req: Request, res: Response): Promise<void> => {
    const uptimeSeconds = process.uptime();
    const uptime = this.formatUptime(uptimeSeconds);
    res.status(200).json({
      message: "Server is running",
      uptime,
    });
  };

  private formatUptime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hours}h ${minutes}m ${secs}s`;
  }
}
